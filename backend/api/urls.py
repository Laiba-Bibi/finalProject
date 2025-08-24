from django.urls import path
from . import views

from .views import (
    register,
    EmailTokenObtainPairView,
    save_interest,
    save_user_info,
    get_profile,
    SkillMatrixAPIView,
    assess_skill,
    assessment_status,
    AutoAssessFromSavedDataView,
    recommended_software_houses,
    generate_roadmap_view,   # ✅ ADD THIS
    submit_expert_review,  # ✅ Add this
    get_my_review,  # for students when the submitt for feedback
    submit_expert_feedback, # expert submit feedback
    expert_submit_feedback, # expert-specific feedback submission
    ResourceListView,
    resource_click,
    resource_click_count,
    claim_badge,
    user_badges,
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', register, name='register'),
    path('token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('save-interest/', save_interest, name='save_interest'),
    path('save-user-info/', save_user_info, name='save_user_info'),
    path('skill-matrix/<str:field_name>/', SkillMatrixAPIView.as_view(), name='skill-matrix'),
    path('auto-assess/', AutoAssessFromSavedDataView.as_view(), name='auto_assess'),
    path('profile/', get_profile, name='profile'),
    path('assess-skill/', assess_skill, name='assess_skill'),
    path('assessment-status/', assessment_status, name='assessment_status'),
    path('recommended-software-houses/', recommended_software_houses, name='recommended-software-houses'),
    path('assessment-status/', assessment_status, name='assessment_status'),
    path('generate-roadmap/', generate_roadmap_view, name='generate_roadmap'),  # ✅ THIS LINe
    path('submit-review/', submit_expert_review),  # ✅ Add this
    path('my-review/', get_my_review),  # ✅ Add this line
    path('submit-feedback/<int:review_id>/', submit_expert_feedback, name='submit-feedback'),
    path('expert/submit-feedback/<int:review_id>/', expert_submit_feedback, name='expert-submit-feedback'),
    path('expert/pending-reviews/', views.pending_reviews, name='pending-reviews'),

    path('resources/', ResourceListView.as_view(), name='resources'),
    path('resource-click/', resource_click, name='resource_click'),
    path('resource-click-count/', resource_click_count, name='resource_click_count'),
    path('claim-badge/', claim_badge, name='claim_badge'),
    path('user-badges/', user_badges, name='user_badges'),
    path('resource-progress/', views.resource_progress, name='resource-progress'),
]