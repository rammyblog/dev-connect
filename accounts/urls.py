from accounts.views import ProfileViewSet, EducationViewSet, ExperienceViewSet, UserEducationList, UserExperienceList, UserProfile
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()
router.register(r'profile', ProfileViewSet, basename='user')
router.register(r'education', EducationViewSet, basename='education')
router.register(r'experience', ExperienceViewSet, basename='experience')

urlpatterns = [
    path('education/user/list', UserEducationList.as_view()),
    path('experience/user/list', UserExperienceList .as_view()),
    path('profile/user/list', UserProfile.as_view())

]


urlpatterns += router.urls
