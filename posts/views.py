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
from django.http import QueryDict


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

    def get_users_posts_likes(self):
        auth_user = get_object_or_404(Profile, user=self.request.user)

        # print(auth_user.user_likes.all())
        return auth_user.user_likes.all().values_list('post', flat=True)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        user_likes = self.get_users_posts_likes()
        context = {
            'user_likes': user_likes,
            'data': serializer.data
        }
        return Response(context)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        auth_user = get_object_or_404(Profile, user=self.request.user)
        existing_users = list(instance.user.values_list('pk', flat=True))
        print(existing_users)
        data = request.data.copy()

        if data['action'] == 'add':
            existing_users.append(int(auth_user.pk))
            likes = len(set(existing_users))
        if data['action'] == 'remove':
            try:
                existing_users.remove(int(auth_user.pk))
            except:
                return Response('User has not liked the post')
            likes = len(set(existing_users))

        data['likes'] = likes
        data['user'] = list(set(existing_users))
        # print(data['user'])

        query_dict = QueryDict('', mutable=True)
        query_dict.update(data)
        print(query_dict)
        serializer = self.get_serializer(
            instance, data=query_dict, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer, data['user'])

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        user_likes = auth_user.user_likes.all().values_list('post', flat=True)
        print(user_likes)
        context = {
            'user_likes': user_likes,
            'data': serializer.data
        }
        return Response(context)

    def perform_update(self, serializer, user):
        serializer.save(user=user)


class DislikesViewSet(ModelViewSet):
    serializer_class = DislikesSerializer
    queryset = DislikesModel.objects.all()
    permission_classes = [IsAuthenticated]

    def get_users_posts_dislikes(self):
        auth_user = get_object_or_404(Profile, user=self.request.user)
        return auth_user.user_dislikes.all().values_list('post', flat=True)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        user_dislikes = self.get_users_posts_dislikes()
        context = {
            'user_dislikes': user_dislikes,
            'data': serializer.data
        }
        return Response(context)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        auth_user = get_object_or_404(Profile, user=self.request.user)
        existing_users = list(instance.user.values_list('pk', flat=True))
        data = request.data.copy()

        if data['action'] == 'add':
            existing_users.append(int(auth_user.pk))
            dislikes = len(set(existing_users))
        if data['action'] == 'remove':
            try:
                existing_users.remove(int(auth_user.pk))
            except:
                return Response('User has not disliked the post')
            dislikes = len(set(existing_users))

        data['dislikes'] = dislikes
        data['user'] = list(set(existing_users))
        # print(data['user'])
        print(data)
        query_dict = QueryDict('', mutable=True)
        query_dict.update(data)
        serializer = self.get_serializer(
            instance, data=query_dict, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer, data['user'])

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        user_dislikes = auth_user.user_dislikes.all().values_list('post', flat=True)

        context = {
            'user_dislikes': user_dislikes,
            'data': serializer.data
        }
        return Response(context)
        return Response(serializer.data)

    def perform_update(self, serializer, user):
        serializer.save(user=user)
