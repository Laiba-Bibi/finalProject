from django.contrib.auth.models import AbstractUser
from django.db import models

class Expert(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True)
    job_title = models.CharField(max_length=100, blank=True)
    years_experience = models.PositiveIntegerField(default=0)
    areas_expertise = models.CharField(max_length=255, blank=True)
    linkedin_url = models.URLField(blank=True)
    portfolio_url = models.URLField(blank=True)
    availability = models.CharField(max_length=50, blank=True)
    mentoring_format = models.CharField(max_length=255, blank=True)
    motivation_statement = models.TextField(blank=True)

    def __str__(self):
        return self.email