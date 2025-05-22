from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import register, EmailTokenObtainPairView  # Import from api.views

urlpatterns = [
    path('register/', register, name='register'),
    path('token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Use custom view
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]