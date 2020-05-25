from django.db import models
from accounts.models import Profile


class Post(models.Model):
    user = models.ForeignKey(
        Profile, on_delete=models.CASCADE)
    content = models.TextField(max_length=5000)

    likes = models.PositiveIntegerField(default=0)
    dislikes = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = ("Post")
        verbose_name_plural = ("Posts")

    def __str__(self):
        return self.user.user.first_name

    def get_user_full_name(self):
        return self.user.user_full_name()

    def get_user_image(self):
        return self.user.image_url


class Comment(models.Model):
    user = models.ForeignKey(
        Profile, on_delete=models.CASCADE)
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE)
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
