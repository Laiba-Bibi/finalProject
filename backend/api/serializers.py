# api/serializers.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Resource
from .models import SoftwareHouse
from .models import UserInterest, UserProfile
from .models import TechField, SkillCategory, SubSkill, Badge  # Added Badge import

User = get_user_model()

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email = attrs.get("username")  # username = email in this override
        password = attrs.get("password")

        try:
            user_obj = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid credentials.')

        user = authenticate(username=user_obj.username, password=password)

        if not user:
            raise serializers.ValidationError('Invalid credentials.')

        attrs['username'] = user.username  # Pass to parent
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

class SubSkillSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')
    field = serializers.CharField(source='category.field.name')

    class Meta:
        model = SubSkill
        fields = ['id', 'name', 'importance', 'category', 'field']

class SoftwareHouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoftwareHouse
        fields = ['id', 'name', 'website', 'linkedin_url', 'focus_areas']

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id','title', 'url', 'interest']

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ['name', 'description']
        # ✅ NEW: ExpertReviewRequestSerializer
from .models import ExpertReviewRequest
from experts.models import Expert

class ExpertReviewRequestSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    expert_username = serializers.CharField(source='expert.username', read_only=True)
    expert_name = serializers.CharField(source='expert.first_name', read_only=True)
    expert_job_title = serializers.CharField(source='expert.job_title', read_only=True)
    expert_years_experience = serializers.IntegerField(source='expert.years_experience', read_only=True)
    expert_areas_expertise = serializers.CharField(source='expert.areas_expertise', read_only=True)
    expert_linkedin_url = serializers.URLField(source='expert.linkedin_url', read_only=True)

    class Meta:
        model = ExpertReviewRequest
        fields = [
            'id', 'user', 'interest', 'education', 'experience', 'goals',
            'roadmap', 'submission_text', 'level', 'message', 'is_reviewed',
            'expert_feedback', 'created_at', 'reviewed_at', 'expert_username',
            'expert_name', 'expert_job_title', 'expert_years_experience',
            'expert_areas_expertise', 'expert_linkedin_url'
        ]


class ExpertReviewSubmitSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpertReviewRequest
        fields = ['expert_feedback', 'is_reviewed', 'reviewed_at', 'expert']
        read_only_fields = ['reviewed_at', 'expert']