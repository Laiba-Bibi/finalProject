from django.contrib import admin
from .models import UserInterest, UserProfile, TechField, SkillCategory, SubSkill

admin.site.register(UserInterest)
admin.site.register(UserProfile)
admin.site.register(TechField)
admin.site.register(SkillCategory)
admin.site.register(SubSkill)
