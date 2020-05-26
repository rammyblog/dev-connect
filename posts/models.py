from django.db import models
from accounts.models import Profile
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.shortcuts import get_object_or_404
# from accounts.models im/


class Post(models.Model):
    user = models.ForeignKey(
        Profile, on_delete=models.CASCADE)
    content = models.TextField(max_length=5000)

    class Meta:
        verbose_name = ("Post")
        verbose_name_plural = ("Posts")

    def __str__(self):
        return self.user.user.first_name

    def get_user_full_name(self):
        return self.user.user_full_name()

    def get_user_image(self):
        return self.user.image_url


class LikesModel(models.Model):
    post = models.ForeignKey(
        Post, related_name='post_likes', on_delete=models.CASCADE)
    user = models.ManyToManyField(
        Profile, related_name='user_likes')
    likes = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.post.user.user.first_name


class DislikesModel(models.Model):
    post = models.ForeignKey(
        Post, related_name='post_dislikes', on_delete=models.CASCADE)
    user = models.ManyToManyField(
        Profile)

    dislikes = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.post.user.user.first_name


class Comment(models.Model):
    user = models.ForeignKey(
        Profile, on_delete=models.CASCADE)
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE)
    content = models.TextField(max_length=5000)

    class Meta:
        verbose_name = ("Comment")
        verbose_name_plural = ("Comments")

    def __str__(self):
        return self.user.user.first_name

    def get_user_full_name(self):
        return self.user.user_full_name()

    def get_user_image(self):
        return self.user.image_url


@receiver(post_save, sender=Post)
def create_or_update_dislikes(sender, instance, created, **kwargs):
    if created:
        # users = Profile.objects.filter(pk__in=[instance.user.pk])

        # instance.emails_for_help.add(*users)
        LikesModel.objects.create(
            post=instance)
        DislikesModel.objects.create(
            post=instance)
