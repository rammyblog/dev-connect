from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from .serializers import EducationSerializer, ProfileSerializer, ExperienceSerializer
from .models import Profile, Education, Experience
from django.shortcuts import get_object_or_404
from .mixins import PermissionMixins, CustomCreateMixin
from .permissions import IsOwnerOrReadOnly


class ProfileViewSet(PermissionMixins, ModelViewSet):
    """
        ViewSet for viewing and editing the Profile
        associated with the user.
    """
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ExperienceViewSet(CustomCreateMixin, PermissionMixins, ModelViewSet):
    serializer_class = ExperienceSerializer
    queryset = Experience.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class EducationViewSet(CustomCreateMixin, PermissionMixins, ModelViewSet):
    serializer_class = EducationSerializer
    queryset = Education.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserEducationList(APIView):
    serializer_class = EducationSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        return Education.objects.filter(user=self.request.user)

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = EducationSerializer(queryset, many=True)
        return Response(serializer.data)


class UserExperienceList(APIView):
    serializer_class = ExperienceSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        return Experience.objects.filter(user=self.request.user)

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = ExperienceSerializer(queryset, many=True)
        return Response(serializer.data)


class UserProfile(APIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = ProfileSerializer(queryset, many=True)
        return Response(serializer.data)
