from rest_framework import serializers
from .models import Comment, Post, LikesModel, DislikesModel
from accounts.models import Profile
from django.shortcuts import get_object_or_404
from accounts.serializers import ProfileSerializer


class CustomProfileSerailzer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id']


class LikeAndDislikeMixins(serializers.Serializer):
    def update(self, instance,  validated_data):
        users = validated_data.pop('user')

        # # if you want to update other fields
        instance = super().update(instance, validated_data)

        # now update users
        if users is not None:
            for user in users:
                instance.user.add(user)
            instance.save()

        return instance


class PostSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    # likes = serializers.SerializerMethodField()
    # dislikes = serializers.SerializerMethodField()
    # user_likes = serializers.SerializerMethodField()
    # user_dislikes = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'user', 'content', 'full_name', 'image', ]

    def get_full_name(self, obj):
        return obj.get_user_full_name()

    def get_image(self, obj):
        return obj.get_user_image()

    # def get_likes(self, obj):
    #     likes = get_object_or_404(LikesModel, post=obj)
    #     return likes.likes

    # def get_likes(self, obj):
    #     dislikes = get_object_or_404(LikesModel, post=obj)
    #     return dislikes


class CommentSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'user', 'content', 'post',
                  'full_name', 'image']

    def get_full_name(self, obj):
        return obj.get_user_full_name()

    def get_image(self, obj):
        return obj.get_user_image()


class LikesSerializer(LikeAndDislikeMixins, serializers.ModelSerializer):
    user = CustomProfileSerailzer(many=True)

    class Meta:
        model = LikesModel
        fields = ['id', 'user', 'likes', 'post']


class DislikesSerializer(LikeAndDislikeMixins, serializers.ModelSerializer):
    user = CustomProfileSerailzer(many=True)

    class Meta:
        model = DislikesModel
        fields = ['id', 'user', 'dislikes', 'post']
