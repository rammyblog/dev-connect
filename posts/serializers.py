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
    def update(self, instance, validated_data):
        print(validated_data, 'testing')
        users = validated_data.pop('user')

        # # if you want to update other fields
        instance = super().update(instance, validated_data)

        # now update users
        if len(users) > 0:
            for user in users:
                # print()
                if len(instance.user.all()) == 0:
                    instance.user.add(user)
                else:
                    instance.user.remove(user)

        else:
            instance.user.clear()
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
        model = Comment
        fields = ['id', 'user', 'content', 'post',
                  'full_name', 'image']

    def get_full_name(self, obj):
        return obj.get_user_full_name()

    def get_image(self, obj):
        return obj.get_user_image()


class LikesSerializer(LikeAndDislikeMixins, serializers.ModelSerializer):
    user = CustomProfileSerailzer(many=True)
    # user_likes = serializers.SerializerMethodField()

    class Meta:
        model = LikesModel
        fields = ['id', 'user', 'likes', 'post']

    # def get_user_likes(self, obj):
    #     request = self.context['request']
    #     auth_user = get_object_or_404(
    #         Profile, user=request.user)
    #     pk = getattr(auth_user, 'pk', False)

    #     output = []
    #     for user in obj.user.all():
    #         if user.id == pk:
    #             output.append(obj.post.pk)

    #     return output


class DislikesSerializer(LikeAndDislikeMixins, serializers.ModelSerializer):
    user = CustomProfileSerailzer(many=True)
    # user_dislikes = serializers.SerializerMethodField()

    class Meta:
        model = DislikesModel
        fields = ['id', 'user', 'dislikes', 'post']

    # def get_user_dislikes(self, obj):
    #     request = self.context['request']
    #     auth_user = get_object_or_404(
    #         Profile, user=request.user)
    #     pk = getattr(auth_user, 'pk', False)
    #     output = []
    #     for user in obj.user.all():
    #         if user.id == pk:
    #             output.append(obj.post.pk)

    #     return output
