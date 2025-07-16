# api/urls.py

from django.urls import path
from .views import register, EmailTokenObtainPairView, save_interest, save_user_info, get_profile
from rest_framework_simplejwt.views import TokenRefreshView
from .views import SkillMatrixAPIView
from .views import AutoAssessFromSavedDataView  # Add this import at the top


urlpatterns = [
    path('register/', register, name='register'),
    path('token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('save-interest/', save_interest, name='save_interest'),
    path('save-user-info/', save_user_info, name='save_user_info'),
    path('skill-matrix/<str:field_name>/', SkillMatrixAPIView.as_view(), name='skill-matrix'),
    path('auto-assess/', AutoAssessFromSavedDataView.as_view(), name='auto_assess'),
    path('profile/', get_profile, name='profile'),
]

