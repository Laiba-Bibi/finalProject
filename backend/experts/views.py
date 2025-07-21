from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
import json
from .models import Expert

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def expert_register(request):
    try:
        data = request.data
        
        # Check if user already exists
        if Expert.objects.filter(email=data.get('email')).exists():
            return Response({
                'error': 'An expert with this email already exists.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Create new expert
        expert = Expert.objects.create(
            username=data.get('email'),  # Use email as username
            email=data.get('email'),
            first_name=data.get('fullName', '').split()[0] if data.get('fullName') else '',
            last_name=' '.join(data.get('fullName', '').split()[1:]) if data.get('fullName') and len(data.get('fullName').split()) > 1 else '',
            phone_number=data.get('phoneNumber', ''),
            job_title=data.get('jobTitle', ''),
            years_experience=data.get('yearsExperience', 0),
            areas_expertise=data.get('areasExpertise', ''),
            linkedin_url=data.get('linkedinUrl', ''),
            portfolio_url=data.get('portfolioUrl', ''),
            availability=data.get('availability', ''),
            mentoring_format=data.get('mentoringFormat', ''),
            motivation_statement=data.get('motivationStatement', ''),
            password=make_password('temp_password_123')  # Set a temporary password
        )
        
        return Response({
            'message': 'Expert registration successful! Please check your email for login credentials.',
            'expert_id': expert.id
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({
            'error': f'Registration failed: {str(e)}'
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def expert_login(request):
    try:
        data = request.data
        email = data.get('email')
        password = data.get('password')
        
        # Authenticate user
        expert = authenticate(username=email, password=password)
        
        if expert is not None and isinstance(expert, Expert):
            # Generate JWT tokens
            refresh = RefreshToken.for_user(expert)
            
            return Response({
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
                'expert': {
                    'id': expert.id,
                    'email': expert.email,
                    'full_name': f"{expert.first_name} {expert.last_name}".strip(),
                    'job_title': expert.job_title,
                    'years_experience': expert.years_experience,
                    'areas_expertise': expert.areas_expertise,
                    'availability': expert.availability,
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)
            
    except Exception as e:
        return Response({
            'error': f'Login failed: {str(e)}'
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def expert_profile(request):
    try:
        expert = request.user
        if not isinstance(expert, Expert):
            return Response({
                'error': 'Not an expert user'
            }, status=status.HTTP_403_FORBIDDEN)
        
        return Response({
            'expert': {
                'id': expert.id,
                'email': expert.email,
                'full_name': f"{expert.first_name} {expert.last_name}".strip(),
                'phone_number': expert.phone_number,
                'job_title': expert.job_title,
                'years_experience': expert.years_experience,
                'areas_expertise': expert.areas_expertise,
                'linkedin_url': expert.linkedin_url,
                'portfolio_url': expert.portfolio_url,
                'availability': expert.availability,
                'mentoring_format': expert.mentoring_format,
                'motivation_statement': expert.motivation_statement,
            }
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'error': f'Failed to get profile: {str(e)}'
        }, status=status.HTTP_400_BAD_REQUEST)
