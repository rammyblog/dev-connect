from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .serializers import EducationSerializer, ProfileSerializer, ExperienceSerializer
from .models import Profile, Education, Experience
from django.shortcuts import get_object_or_404
from .mixins import PermissionMixins


class ProfileViewSet(PermissionMixins, ModelViewSet):
    """
        ViewSet for viewing and editing the Profile
        associated with the user.
    """
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    # permission_classes = [IsOwnerOrReadOnly]

    # def get_queryset(self):
    #     return Profile.objects.all()


class ExperienceViewSet(PermissionMixins, ModelViewSet):
    serializer_class = ExperienceSerializer
    queryset = Experience.objects.all()


class EducationViewSet(PermissionMixins, ModelViewSet):
    serializer_class = EducationSerializer
    queryset = Education.objects.all()
