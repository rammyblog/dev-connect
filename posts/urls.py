from .views import PostViewSet, CommentViewSet, LikesViewSet, DislikesViewSet
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()
router.register(r'post', PostViewSet, basename='post')
router.register(r'comment', CommentViewSet, basename='comment')
router.register(r'likes', LikesViewSet, basename='likes')
router.register(r'dislikes', DislikesViewSet, basename='dislikes')


# urlpatterns = [
#     path('education/user/list', UserEducationList.as_view()),
#     path('experience/user/list', UserExperienceList .as_view()),
#     path('profile/user/list', UserProfile.as_view())

# ]


urlpatterns = router.urls
