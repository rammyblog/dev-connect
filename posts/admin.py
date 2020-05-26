from django.contrib import admin

# Register your models here.
from .models import Post, Comment, LikesModel, DislikesModel

admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(LikesModel)
admin.site.register(DislikesModel)
