from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from datetime import timedelta
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

from .models import (
    TechField, SubSkill, SkillAssessmentResult, UserInterest,
    UserProfile, SoftwareHouse, Resource, ResourceClick,
    Badge, UserBadge, ExpertReviewRequest
)
from .serializers import (
    EmailTokenObtainPairSerializer, UserInterestSerializer,
    UserProfileSerializer, SubSkillSerializer,
    SoftwareHouseSerializer, ResourceSerializer,
    ExpertReviewSubmitSerializer, ExpertReviewRequestSerializer
)
from .ai_utils import generate_roadmap
from experts.models import Expert
from rest_framework import generics

User = get_user_model()

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if not username or not password or not email:
        return Response({'error': 'Please provide username, email, and password.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create(
        username=username,
        email=email,
        password=make_password(password)
    )

    UserProfile.objects.create(user=user)
    UserInterest.objects.create(user=user)

    return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_interest(request):
    interest = request.data.get('interest')

    if not interest:
        return Response({'error': 'Interest is required.'}, status=status.HTTP_400_BAD_REQUEST)

    UserInterest.objects.update_or_create(
        user=request.user,
        defaults={'interest': interest}
    )
    return Response({'message': 'Interest saved successfully.'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_user_info(request):
    serializer = UserProfileSerializer(data=request.data)
    if serializer.is_valid():
        UserProfile.objects.update_or_create(
            user=request.user,
            defaults=serializer.validated_data
        )
        return Response({'message': 'User information saved successfully.'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SkillMatrixAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, field_name):
        skills = SubSkill.objects.filter(category__field__name__iexact=field_name)
        serializer = SubSkillSerializer(skills, many=True)
        return Response(serializer.data)


class AutoAssessFromSavedDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        try:
            interest = user.interest.interest
        except UserInterest.DoesNotExist:
            return Response({"error": "No interest found for user"}, status=400)

        try:
            experience = user.profile.experience
        except UserProfile.DoesNotExist:
            return Response({"error": "No profile data found for user"}, status=400)

        user_skills = [s.strip().lower() for s in experience.split(',')]
        expected_skills = SubSkill.objects.filter(category_fieldname_iexact=interest)
        total_skills = expected_skills.count()

        matched = 0
        unmatched_skills = []

        for skill in expected_skills:
            if skill.name.lower() in user_skills:
                matched += 1
            else:
                unmatched_skills.append(skill.name)

        if total_skills == 0:
            level = "Unknown"
        else:
            ratio = matched / total_skills
            if ratio < 0.3:
                level = "Beginner"
            elif ratio < 0.7:
                level = "Intermediate"
            else:
                level = "Advanced"

        SkillAssessmentResult.objects.create(
            user=user,
            interest=interest,
            experience_text=experience,
            calculated_level=level,
            matched_skills=matched,
            total_skills=total_skills,
        )

        return Response({
            "interest": interest,
            "experience": experience,
            "level": level,
            "matched_skills": matched,
            "total_skills": total_skills,
            "missing_skills": unmatched_skills
        })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user

    try:
        profile = user.profile
    except UserProfile.DoesNotExist:
        return Response({'error': 'No profile found.'}, status=404)

    try:
        interest = user.interest.interest
    except UserInterest.DoesNotExist:
        interest = None

    assessment_done = False
    assessment_level = None

    if interest:
        result = SkillAssessmentResult.objects.filter(user=user, interest=interest).first()
        if result:
            assessment_done = True
            assessment_level = result.calculated_level

    return Response({
        'username': user.username,
        'email': user.email,
        'education': profile.education,
        'experience': profile.experience,
        'goals': profile.goals,
        'interested_in_learning': profile.interested_in_learning,
        'interest': interest,
        'assessment_done': assessment_done,
        'assessment_level': assessment_level
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def assess_skill(request):
    user = request.user
    answers = request.data.get('answers')

    try:
        interest = user.interest.interest
    except:
        return Response({'error': 'Interest not set.'}, status=400)

    already_done = SkillAssessmentResult.objects.filter(user=user, interest=interest).exists()
    if already_done:
        existing = SkillAssessmentResult.objects.get(user=user, interest=interest)
        return Response({
            'message': f"You have already done your assessment for {interest}.",
            'level': existing.calculated_level,
            'score': None,
            'already_done': True
        }, status=200)

    skills = SubSkill.objects.filter(category__field__name__iexact=interest)

    total = 0
    weight_sum = 0

    for skill in skills:
        score = answers.get(str(skill.id))
        if score is not None:
            weight = 1.0 if skill.importance == 'High' else 0.5
            total += int(score) * weight
            weight_sum += weight

    if weight_sum == 0:
        level = 'Unknown'
        final = 0
    else:
        avg = total / weight_sum
        if avg < 2.5:
            level = 'Beginner'
        elif avg < 3.5:
            level = 'Intermediate'
        else:
            level = 'Advanced'
        final = avg

    SkillAssessmentResult.objects.create(
        user=user,
        interest=interest,
        experience_text=user.profile.experience if hasattr(user, 'profile') else "",
        calculated_level=level,
        matched_skills=len(answers),
        total_skills=skills.count()
    )

    return Response({
        'message': f"Your assessment for {interest} is done.",
        'level': level,
        'score': final,
        'already_done': False
    }, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def assessment_status(request):
    user = request.user
    try:
        interest = user.interest.interest
    except:
        return Response({'error': 'Interest not set'}, status=400)

    result = SkillAssessmentResult.objects.filter(user=user, interest=interest).first()
    if result:
        return Response({
            'already_done': True,
            'level': result.calculated_level,
            'interest': interest
        })
    else:
        return Response({'already_done': False, 'interest': interest})

@api_view(['GET'])
@permission_classes([AllowAny])
def recommended_software_houses(request):
    companies = SoftwareHouse.objects.all()
    serializer = SoftwareHouseSerializer(companies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def generate_roadmap_view(request):
    user = request.user

    try:
        profile = user.profile
        interest = user.interest.interest
    except (UserProfile.DoesNotExist, UserInterest.DoesNotExist):
        return Response({'error': 'Incomplete profile or interest.'}, status=400)

    result = SkillAssessmentResult.objects.filter(user=user, interest=interest).first()
    if not result:
        return Response({'error': 'Assessment not done yet.'}, status=400)

    roadmap = generate_roadmap(
        interest=interest,
        education=profile.education,
        level=result.calculated_level
    )

    return Response({'roadmap': roadmap})

class ResourceListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ResourceSerializer

    def get_queryset(self):
        user_interest = self.request.user.interest
        return Resource.objects.filter(interest__iexact=user_interest.interest)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def resource_click(request):
    user = request.user
    resource_id = request.data.get('resource_id')
    try:
        resource = Resource.objects.get(id=resource_id)
        click = ResourceClick.objects.create(user=user, resource=resource)
    except Resource.DoesNotExist:
        return Response({'error': 'Resource not found'}, status=404)
    return Response({'message': 'Click recorded'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def resource_click_count(request):
    user = request.user
    one_week_ago = timezone.now() - timedelta(days=7)
    click_count = ResourceClick.objects.filter(user=user, clicked_at__gte=one_week_ago).count()
    return Response({'click_count': click_count})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def claim_badge(request):
    user = request.user
    badge_name = request.data.get('badge_name')

    BADGE_REQUIREMENTS = {
        'Curious Learner': {'views': 5, 'desc': 'For exploring 5+ resources in 7 days'},
        'Keen Researcher': {'views': 7, 'desc': 'For exploring 7+ resources in 7 days'},
        'Resource Pro': {'views': 10, 'desc': 'For exploring 10+ resources in 7 days'},
        'Explorer': {'views': 15, 'desc': 'For exploring 15+ resources in 7 days'},
    }

    if badge_name not in BADGE_REQUIREMENTS:
        return Response({'error': 'Invalid badge name'}, status=400)

    requirement = BADGE_REQUIREMENTS[badge_name]
    one_week_ago = timezone.now() - timedelta(days=7)
    recent_clicks = ResourceClick.objects.filter(user=user, clicked_at__gte=one_week_ago).count()

    already_awarded = UserBadge.objects.filter(user=user, badge__name=badge_name).exists()
    if already_awarded:
        return Response({'error': 'Badge already awarded'}, status=400)

    if recent_clicks < requirement['views']:
        return Response({'error': f'You need to view {requirement["views"]} resources in a week to claim this badge'}, status=400)

    badge, _ = Badge.objects.get_or_create(
        name=badge_name,
        defaults={'description': requirement['desc']}
    )
    UserBadge.objects.create(user=user, badge=badge)
    return Response({'message': f'{badge_name} badge awarded successfully'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_badges(request):
    user = request.user
    badges = UserBadge.objects.filter(user=user).select_related('badge')
    data = [
        {
            'name': ub.badge.name,
            'description': ub.badge.description
        }
        for ub in badges
    ]
    return Response(data)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def resource_progress(request):
    user = request.user
    one_week_ago = timezone.now() - timedelta(days=7)
    click_count = ResourceClick.objects.filter(user=user, clicked_at__gte=one_week_ago).count()

    earned_badges = set(UserBadge.objects.filter(user=user).values_list('badge__name', flat=True))

    BADGE_CONFIG = [
        {
            "name": "Curious Learner",
            "views_required": 5,
            "image": "curious_badge.png",
            "title": "Knowledge Seeker"
        },
        {
            "name": "Keen Researcher",
            "views_required": 7,
            "image": "keen_badge.png",
            "title": "Informed Learner"
        },
        {
            "name": "Resource Pro",
            "views_required": 10,
            "image": "resource_pro.png",
            "title": "Resource Adventurer"
        },
        {
            "name": "Explorer",
            "views_required": 15,
            "image": "explorer_badge.png",
            "title": "Content Master"
        },
    ]

    badges_progress = []
    current_title = "New Explorer"

    for badge in BADGE_CONFIG:
        earned = badge['name'] in earned_badges
        if click_count >= badge['views_required']:
            current_title = badge['title']
        badges_progress.append({
            "name": badge['name'],
            "required": badge['views_required'],
            "earned": earned,
            "remaining": max(badge['views_required'] - click_count, 0),
            "image": badge['image']
        })

    return Response({
        "click_count": click_count,
        "progress_title": current_title,
        "badges": badges_progress
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_expert_review(request):
    user = request.user
    message = request.data.get('message')

    if not message:
        return Response({'error': 'Message is required.'}, status=400)

    if not hasattr(user, 'interest') or not hasattr(user, 'profile'):
        return Response({'error': 'Profile or interest is missing.'}, status=400)

    interest = user.interest.interest
    level = user.profile.education

    if ExpertReviewRequest.objects.filter(user=user, interest=interest).exists():
        return Response({'error': 'You have already submitted a review request for this interest.'}, status=400)

    review = ExpertReviewRequest.objects.create(
        user=user,
        interest=interest,
        level=level,
        message=message
    )

    return Response({'message': 'Review request submitted successfully.', 'review_id': review.id}, status=201)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_review(request):
    user = request.user
    try:
        review = ExpertReviewRequest.objects.get(user=user)
        serializer = ExpertReviewRequestSerializer(review)
        return Response({"review": serializer.data})
    except ExpertReviewRequest.DoesNotExist:
        return Response({"review": None})


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_expert_feedback(request, review_id):
    try:
        review = ExpertReviewRequest.objects.get(id=review_id)
    except ExpertReviewRequest.DoesNotExist:
        return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)

    if not hasattr(request.user, 'job_title'):
        return Response({'error': 'Only experts can submit feedback'}, status=status.HTTP_403_FORBIDDEN)

    serializer = ExpertReviewSubmitSerializer(review, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save(
            expert=request.user,
            reviewed_at=timezone.now(),
            is_reviewed=True
        )
        return Response({'message': 'Feedback submitted successfully'})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def expert_review_list(request):
    reviews = ExpertReviewRequest.objects.filter(is_reviewed=False).order_by('-created_at')
    serializer = ExpertReviewRequestSerializer(reviews, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def pending_reviews(request):
    reviews = ExpertReviewRequest.objects.filter(is_reviewed=False)
    serializer = ExpertReviewRequestSerializer(reviews, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def expert_submit_feedback(request, review_id):
    try:
        if not isinstance(request.user, Expert):
            return Response({'error': 'Only experts can submit feedback'}, status=status.HTTP_403_FORBIDDEN)

        review = ExpertReviewRequest.objects.get(id=review_id)
    except ExpertReviewRequest.DoesNotExist:
        return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ExpertReviewSubmitSerializer(review, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save(
            expert=request.user,
            reviewed_at=timezone.now(),
            is_reviewed=True
        )
        return Response({'message': 'Feedback submitted successfully'})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)