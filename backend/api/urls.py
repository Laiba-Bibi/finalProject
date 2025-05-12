from django.urls import path
from .views import test_api

urlpatterns = [
    path('test/', test_api),  # http://localhost:8000/api/test/
]
