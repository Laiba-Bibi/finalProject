from django.db import models
from django.contrib.auth import get_user_model
from experts.models import Expert  # ✅ Import the Expert model


# Dynamically get the custom user model (used as Expert or general user)
User = get_user_model()


# ========== USER-RELATED MODELS ==========
class UserInterest(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='interest')
    interest = models.CharField(max_length=100)

    def _str_(self):
        return f"{self.user.username} - {self.interest}"


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    education = models.CharField(max_length=100)
    experience = models.TextField(blank=True)
    goals = models.TextField(blank=True)
    interested_in_learning = models.BooleanField(default=True)

    def _str_(self):
        return f"{self.user.username} Profile"


# ========== SKILL ASSESSMENT MODELS ==========
class TechField(models.Model):
    name = models.CharField(max_length=100)

    def _str_(self):
        return self.name


class SkillCategory(models.Model):
    field = models.ForeignKey(TechField, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def _str_(self):
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

    def _str_(self):
        return f"{self.name} ({self.importance})"


class SkillAssessmentResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    interest = models.CharField(max_length=100)  # e.g. Web Development
    experience_text = models.TextField()         # what user typed
    calculated_level = models.CharField(max_length=50)  # Beginner, Intermediate, Advanced
    matched_skills = models.IntegerField()
    total_skills = models.IntegerField()
    assessment_date = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f"{self.user.username} - {self.interest} ({self.calculated_level})"


# ========== OTHER MODELS ==========
class Interest(models.Model):
    name = models.CharField(max_length=100)

    def _str_(self):
        return self.name


class SoftwareHouse(models.Model):
    name = models.CharField(max_length=255)
    website = models.URLField(null=True, blank=True)
    linkedin_url = models.URLField(null=True, blank=True)
    focus_areas = models.CharField(max_length=255, blank=True, null=True)  # New Field

    def _str_(self):
        return self.name


class Resource(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()
    interest = models.CharField(max_length=100)  # Must match user.interest.interest
    type = models.CharField(max_length=100, default='Article')

    def _str_(self):
        return self.title

class ResourceClick(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    resource = models.ForeignKey('Resource', on_delete=models.CASCADE)
    clicked_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f"{self.user.email} clicked {self.resource.title}"

class Badge(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def _str_(self):
        return self.name


class UserBadge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    awarded_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f"{self.user.email} - {self.badge.name}"


class ExpertReviewRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='review_requests')
    interest = models.CharField(max_length=100)
    education = models.CharField(max_length=100)
    experience = models.TextField(blank=True)
    goals = models.TextField(blank=True)
    roadmap = models.TextField(blank=True)  # Optional roadmap text
    submission_text = models.TextField()    # Student's question or extra notes
    level = models.CharField(max_length=50, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    is_reviewed = models.BooleanField(default=False)
    expert_feedback = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)
     # ✅ New optional expert assignment field
    expert = models.ForeignKey(
        Expert,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='assigned_reviews'
    )
    def _str_(self):
      return f"Review by {self.user.username} - {self.interest}"