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
class TechField(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class SkillCategory(models.Model):
    field = models.ForeignKey(TechField, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.field.name} - {self.name}"

class SubSkill(models.Model):
    category = models.ForeignKey(SkillCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    importance = models.CharField(
        max_length=10,
        choices=[
            ('High', 'High'),
            ('Medium', 'Medium'),
            ('Low', 'Low'),
        ]
    )

    def __str__(self):
        return f"{self.name} ({self.importance})"
