from rest_framework import serializers
from allauth.account import app_settings as allauth_settings
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from allauth.utils import (email_address_exists,
                           get_username_max_length)
from django.utils.translation import ugettext_lazy as _

from rest_framework.exceptions import ValidationError

from rest_framework import serializers, exceptions
from rest_auth.serializers import LoginSerializer
from rest_auth.registration.serializers import RegisterSerializer

from .models import Profile, Experience, Education
from .mixins import CustomErrorSerializer, DateValidation
from datetime import date


class ProfileSerializer(CustomErrorSerializer,  serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = '__all__'

    # def validate(self, value):
    #     print(value)


class ExperienceSerializer(DateValidation, CustomErrorSerializer, serializers.ModelSerializer):

    class Meta:
        model = Experience
        fields = '__all__'


class EducationSerializer(DateValidation, CustomErrorSerializer,  serializers.ModelSerializer):

    class Meta:
        model = Education
        fields = '__all__'


class CustomRegisterSerializer(CustomErrorSerializer, RegisterSerializer):
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    first_name = serializers.CharField(required=False, write_only=True)
    last_name = serializers.CharField(required=False, write_only=True)
    password1 = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)


class CustomLoginSerializer(CustomErrorSerializer, LoginSerializer):
    email = serializers.EmailField(required=True, allow_blank=False)
    password = serializers.CharField(style={'input_type': 'password'})
