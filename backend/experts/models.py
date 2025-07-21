from django.db import models
from django.contrib.auth.models import AbstractUser

class Expert(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    job_title = models.CharField(max_length=100)
    years_experience = models.PositiveIntegerField()
    areas_expertise = models.TextField()  # Comma-separated values
    linkedin_url = models.URLField(blank=True, null=True)
    portfolio_url = models.URLField(blank=True, null=True)
    availability = models.CharField(max_length=20)
    mentoring_format = models.TextField(blank=True, null=True)  # Comma-separated values
    motivation_statement = models.TextField()

    # Add related_name to avoid clashes
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='experts_groups',  # Unique related_name
        blank=True,
        help_text='The groups this expert belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='experts_permissions',  # Unique related_name
        blank=True,
        help_text='Specific permissions for this expert.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return self.username