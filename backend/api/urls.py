# api/urls.py

from django.urls import path
from .views import register, EmailTokenObtainPairView, save_interest, save_user_info
from rest_framework_simplejwt.views import TokenRefreshView
from .views import SkillMatrixAPIView


urlpatterns = [
    path('register/', register, name='register'),
    path('token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('save-interest/', save_interest, name='save_interest'),
    path('save-user-info/', save_user_info, name='save_user_info'),
    path('skill-matrix/<str:field_name>/', SkillMatrixAPIView.as_view(), name='skill-matrix'),

]
