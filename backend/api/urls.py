from django.urls import path
from .views import (
    register,
    EmailTokenObtainPairView,
    save_interest,
    save_user_info,
    get_profile,
    SkillMatrixAPIView,
    assess_skill,
    assessment_status,
    AutoAssessFromSavedDataView,
    generate_roadmap_view,   # ✅ ADD THIS
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', register, name='register'),
    path('token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('save-interest/', save_interest, name='save_interest'),
    path('save-user-info/', save_user_info, name='save_user_info'),
    path('skill-matrix/<str:field_name>/', SkillMatrixAPIView.as_view(), name='skill-matrix'),
    path('auto-assess/', AutoAssessFromSavedDataView.as_view(), name='auto_assess'),
    path('profile/', get_profile, name='profile'),
    path('assess-skill/', assess_skill, name='assess_skill'),
    path('assessment-status/', assessment_status, name='assessment_status'),
    path('generate-roadmap/', generate_roadmap_view, name='generate_roadmap'),  # ✅ THIS LINe
]
