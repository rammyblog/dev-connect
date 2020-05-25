from rest_framework import serializers
from .models import Comment, Post


class PostSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'user', 'content', 'likes',
                  'dislikes', 'full_name', 'image']

    def get_full_name(self, obj):
        return obj.get_user_full_name()

    def image(self, obj):
        return obj.get_user_image()


class CommentSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'user', 'content', 'post',
                  'full_name', 'image']

    def get_full_name(self, obj):
        return obj.get_user_full_name()

    def image(self, obj):
        return obj.get_user_image()
