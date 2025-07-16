from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView

from .serializers import (
    EmailTokenObtainPairSerializer,
    UserInterestSerializer,
    UserProfileSerializer,
    SubSkillSerializer,
)
from .models import UserInterest, UserProfile, SubSkill, SkillAssessmentResult

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
# ✅ Add this at the end of your views.py
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

    return Response({
        'username': user.username,
        'email': user.email,
        'education': profile.education,
        'experience': profile.experience,
        'goals': profile.goals,
        'interested_in_learning': profile.interested_in_learning,
        'interest': interest
    })
