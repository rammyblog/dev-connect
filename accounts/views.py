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

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        response_data = serializer.data
        # response_data['full_name'] =
        # print(response_data)
        return Response(serializer.data)


class ExperienceViewSet(PermissionMixins, ModelViewSet):
    serializer_class = ExperienceSerializer
    queryset = Experience.objects.all()


class EducationViewSet(PermissionMixins, ModelViewSet):
    serializer_class = EducationSerializer
    queryset = Education.objects.all()
