from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from .serializers import PostSerializer, CommentSerializer, LikesSerializer, DislikesSerializer
from .models import Post, Comment, LikesModel, DislikesModel
from accounts.mixins import PermissionMixins
from accounts.permissions import IsOwnerOrReadOnly
from accounts.models import Profile
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


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


class LikesViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]

    serializer_class = LikesSerializer
    queryset = LikesModel.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        likes = instance.likes + 1
        existing_users = list(instance.user.values_list('pk', flat=True))
        data = request.data.copy()

        existing_users.append(int(data['user']))
        data['likes'] = likes
        data['user'] = list(set(existing_users))
        print(data['user'])
        serializer = self.get_serializer(
            instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer, data['user'])

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer, user):
        serializer.save(user=user)


class DislikesViewSet(ModelViewSet):
    serializer_class = DislikesSerializer
    queryset = DislikesModel.objects.all()
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        dislikes = instance.dislikes + 1
        existing_users = list(instance.user.values_list('pk', flat=True))
        data = request.data.copy()

        existing_users.append(int(data['user']))
        data['dislikes'] = dislikes
        data['user'] = list(set(existing_users))
        print(data['user'])
        serializer = self.get_serializer(
            instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer, data['user'])

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer, user):
        serializer.save(user=user)
