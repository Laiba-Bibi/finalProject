# api/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class UserInterest(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='interest')
    interest = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.username} - {self.interest}"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    education = models.CharField(max_length=100)
    experience = models.TextField(blank=True)
    goals = models.TextField(blank=True)
    interested_in_learning = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.username} Profile"
