from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView

from .models import SubSkill, SkillAssessmentResult, UserInterest, UserProfile
from .serializers import (
    EmailTokenObtainPairSerializer,
    UserInterestSerializer,
    UserProfileSerializer,
    SubSkillSerializer,
)
from .ai_utils import generate_roadmap  # ✅ Import AI roadmap utility

User = get_user_model()

# ✅ Register a new user
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if not username or not password or not email:
        return Response({'error': 'Please provide username, email, and password.'},
                        status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists.'},
                        status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists.'},
                        status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create(
        username=username,
        email=email,
        password=make_password(password)
    )

    # Create empty profile and interest records
    UserProfile.objects.create(user=user)
    UserInterest.objects.create(user=user)

    return Response({'message': 'User created successfully.'},
                    status=status.HTTP_201_CREATED)

# ✅ JWT login with email
class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

# ✅ Save interest (protected)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_interest(request):
    interest = request.data.get('interest')

    if not interest:
        return Response({'error': 'Interest is required.'},
                        status=status.HTTP_400_BAD_REQUEST)

    UserInterest.objects.update_or_create(
        user=request.user,
        defaults={'interest': interest}
    )
    return Response({'message': 'Interest saved successfully.'})

# ✅ Save user profile info (protected)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_user_info(request):
    serializer = UserProfileSerializer(data=request.data)
    if serializer.is_valid():
        UserProfile.objects.update_or_create(
            user=request.user,
            defaults=serializer.validated_data
        )
        return Response({'message': 'User information saved successfully.'},
                        status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ Skill Matrix API
class SkillMatrixAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, field_name):
        skills = SubSkill.objects.filter(category__field__name__iexact=field_name)
        serializer = SubSkillSerializer(skills, many=True)
        return Response(serializer.data)

# ✅ Auto Assess API
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

        expected_skills = SubSkill.objects.filter(category__field__name__iexact=interest)
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

# ✅ Get Profile
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

# ✅ Assess Skill
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

# ✅ Assessment Status
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

# ✅ AI Roadmap View
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

    from .ai_utils import generate_roadmap  # ✅ Safely import here to avoid circular issues

    roadmap = generate_roadmap(
        interest=interest,
        education=profile.education,
        level=result.calculated_level
    )

    return Response({'roadmap': roadmap})
