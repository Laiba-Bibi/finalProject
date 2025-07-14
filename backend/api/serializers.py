# api/serializers.py

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserInterest, UserProfile


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email = attrs.get("username")
        password = attrs.get("password")

        try:
            user_obj = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid credentials.')

        user = authenticate(username=user_obj.username, password=password)

        if not user:
            raise serializers.ValidationError('Invalid credentials.')

        attrs['username'] = user.username
        data = super().validate(attrs)
        return data
class UserInterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInterest
        fields = ['interest']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['education', 'experience', 'goals', 'interested_in_learning']

    def validate_interested_in_learning(self, value):
        # If value is already boolean, just return it
        if isinstance(value, bool):
            return value

        # Convert "Yes" -> True, "No" -> False
        if isinstance(value, str):
            if value.lower() == "yes":
                return True
            elif value.lower() == "no":
                return False

        raise serializers.ValidationError("interested_in_learning must be 'Yes' or 'No' or boolean.")
from .models import TechField, SkillCategory, SubSkill

class SubSkillSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')
    field = serializers.CharField(source='category.field.name')

    class Meta:
        model = SubSkill
        fields = ['id', 'name', 'importance', 'category', 'field']
