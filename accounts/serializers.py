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

from django.core.exceptions import ObjectDoesNotExist


class ProfileSerializer(CustomErrorSerializer,  serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    current_job = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ('id', 'full_name', 'bio', 'current_job', 'skills', 'facebook_link', 'linkedin_link',
                  'twitter_link', 'website', 'instagram_link', 'github_link', 'professional_status', 'image_url', 'location')

    def get_full_name(self, value):
        return value.user_full_name()

    def get_current_job(self, value):
        try:
            current_job = Experience.objects.filter(
                user=value.user, is_current=True).values_list('company_name', flat=True)[:1]
            if current_job:
                return current_job[0]
        except ObjectDoesNotExist:
            return None


class ExperienceSerializer(DateValidation, CustomErrorSerializer, serializers.ModelSerializer):

    class Meta:
        model = Experience
        fields = ['id', 'company_name', 'job_title', 'location',
                  'from_date', 'to_date', 'is_current', 'desc', 'profile_id']


class EducationSerializer(DateValidation, CustomErrorSerializer,  serializers.ModelSerializer):

    class Meta:
        model = Education
        fields = ['id', 'sch_name', 'from_date', 'to_date',
                  'is_current', 'desc', 'field_of_study', 'degree', 'profile_id']


class CustomRegisterSerializer(CustomErrorSerializer, RegisterSerializer):
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    first_name = serializers.CharField(required=True, write_only=True)
    last_name = serializers.CharField(required=True, write_only=True)
    password1 = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', '')
        }


class CustomLoginSerializer(CustomErrorSerializer, LoginSerializer):
    email = serializers.EmailField(required=True, allow_blank=False)
    password = serializers.CharField(style={'input_type': 'password'})
