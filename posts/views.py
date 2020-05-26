from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from .serializers import PostSerializer, CommentSerializer
from .models import Post, Comment
from accounts.mixins import PermissionMixins
from accounts.permissions import IsOwnerOrReadOnly
from accounts.models import Profile
from django.shortcuts import get_object_or_404
from rest_framework import status


class PostViewSet(PermissionMixins, ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        user = get_object_or_404(Profile, user=self.request.user)
        data['user'] = user.pk
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CommentViewSet(PermissionMixins, ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        user = get_object_or_404(Profile, user=self.request.user)
        data['user'] = user.pk
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
