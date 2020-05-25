from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from .serializers import PostSerializer, CommentSerializer
from .models import Post, Comment
from accounts.mixins import PermissionMixins
from accounts.permissions import IsOwnerOrReadOnly


class PostViewSet(PermissionMixins, ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentViewSet(PermissionMixins, ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
