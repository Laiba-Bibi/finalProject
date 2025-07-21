from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.expert_register, name='expert_register'),
    path('login/', views.expert_login, name='expert_login'),
    path('profile/', views.expert_profile, name='expert_profile'),
] 