# api/views.py

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import EmailTokenObtainPairSerializer
from django.contrib.auth import get_user_model
from .models import UserInterest, UserProfile
from rest_framework.views import APIView
from .serializers import UserInterestSerializer, UserProfileSerializer

User = get_user_model()

# Register a new user
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

    return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)

# Token login with email
class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

# Save user interest (protected)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_interest(request):
    interest = request.data.get('interest')
    
    if not interest:
        return Response({'error': 'Interest is required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Here you can connect it to a model — for demo, just return the interest
    return Response({'message': 'Interest saved successfully.', 'interest': interest})
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_interest(request):
    serializer = UserInterestSerializer(data=request.data)
    if serializer.is_valid():
        UserInterest.objects.update_or_create(user=request.user, defaults=serializer.validated_data)
        return Response({'message': 'Interest saved successfully.'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_user_info(request):
    serializer = UserProfileSerializer(data=request.data)
    if serializer.is_valid():
        UserProfile.objects.update_or_create(user=request.user, defaults=serializer.validated_data)
        return Response({'message': 'User information saved successfully.'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    from rest_framework.views import APIView
from .models import SubSkill
from .serializers import SubSkillSerializer

class SkillMatrixAPIView(APIView):
    def get(self, request, field_name):
        skills = SubSkill.objects.filter(category__field__name__iexact=field_name)
        serializer = SubSkillSerializer(skills, many=True)
        return Response(serializer.data)
