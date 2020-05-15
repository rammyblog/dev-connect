from accounts.views import ProfileViewSet, EducationViewSet, ExperienceViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'profile', ProfileViewSet, basename='user')
router.register(r'education', EducationViewSet, basename='education')
router.register(r'experience', ExperienceViewSet, basename='experience')

urlpatterns = router.urls
