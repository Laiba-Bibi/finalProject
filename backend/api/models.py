from django.db import models
from django.contrib.auth import get_user_model

# Dynamically get the user model (Expert)
User = get_user_model()

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

class SkillAssessmentResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    interest = models.CharField(max_length=100)  # e.g. Web Development
    experience_text = models.TextField()         # what user typed
    calculated_level = models.CharField(max_length=50)  # Beginner, Intermediate, Advanced
    matched_skills = models.IntegerField()
    total_skills = models.IntegerField()
    assessment_date = models.DateTimeField(auto_now_add=True)
