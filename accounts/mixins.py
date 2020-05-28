
from rest_framework.serializers import Serializer, ValidationError
from rest_framework.utils.serializer_helpers import ReturnDict
from rest_framework import viewsets, status
from .permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Profile
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response


class CustomErrorSerializer(Serializer):
    # Overiding the default error message
    @property
    def errors(self):
        ret = super().errors
        if isinstance(ret, list) and len(ret) == 1 and getattr(ret[0], 'code', None) == 'null':
            # Edge case. Provide a more descriptive error than
            # "this field may not be null", when no data is passed.
            detail = ErrorDetail('No data provided', code='null')
            ret = {api_settings.NON_FIELD_ERRORS_KEY: [detail]}

        # print(str(ret.items()))
        # my_dict = {'foo': 'bar', 'spam': 'eggs'}

        if not ret:
            return
        first_error = next(iter(ret))
        try:
            msg = ret[first_error][0]
            error_msg = msg.replace('This field', first_error)
        except KeyError:
            msg = ret[first_error]['response_message'][0]
            error_msg = msg.replace('This field', first_error)

        context = {
            'error_msg': error_msg
        }
        return ReturnDict(context, serializer=self)


class DateValidation(CustomErrorSerializer):
    def validate(self, data):
        if not data['is_current']:
            if data['to_date'] == '':
                raise ValidationError(
                    ("The TO date cannot be empty"))

            if data['from_date'] > data['to_date']:
                raise ValidationError(
                    ("The From date cannot be greater than the TO date"))
        if data['is_current']:
            data['to_date'] = None
        return data


class PermissionMixins(viewsets.ViewSet):
    def get_permissions(self):
        """
            Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'list':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsOwnerOrReadOnly]
        return [permission() for permission in permission_classes]


class CustomCreateMixin(ModelViewSet):
    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        profile = get_object_or_404(Profile, user=self.request.user)
        data['profile_id'] = profile.pk
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
