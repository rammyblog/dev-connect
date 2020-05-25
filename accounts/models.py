from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.db.models.signals import post_save
from django.dispatch import receiver
from .utils import get_gravatar_image_url


class Profile(models.Model):

    Developer = 'Developer'
    Junior_Developer = 'Junior Developer'
    Senior_Developer = 'Senior Developer'
    Manager = 'Manager'
    Student_learning = 'Student Or Learning'
    Instructor_teacher = 'Instructor or Teacher'
    Intern = 'Intern'
    Other = 'Other'

    PROFESSIONAL_STATUS_CHOICES = [
        (Developer, 'Developer'),
        (Junior_Developer, 'Junior Developer'),
        (Senior_Developer, 'Senior Developer'),
        (Intern, 'Intern'),
        (Manager, 'Manager'),
        (Student_learning, 'Student or Learning'),
        (Instructor_teacher, 'Instructor or Teacher'),
        (Other, 'Other'),


    ]
    user = models.OneToOneField(
        User, related_name='profile', on_delete=models.CASCADE)
    bio = models.CharField(max_length=5000, null=True, blank=True)
    skills = ArrayField(models.CharField(max_length=20), null=True, blank=True)
    facebook_link = models.URLField(null=True, blank=True)
    linkedin_link = models.URLField(null=True, blank=True)
    twitter_link = models.URLField(null=True, blank=True)
    website = models.URLField(null=True, blank=True)
    instagram_link = models.URLField(null=True, blank=True)
    github_link = models.URLField(null=True, blank=True)
    professional_status = models.CharField(
        max_length=21,
        choices=PROFESSIONAL_STATUS_CHOICES,
        default=Other,
        null=True, blank=True
    )
    image_url = models.URLField(null=True, blank=True)

    location = models.CharField(max_length=500, null=True, blank=True)

    class Meta:
        verbose_name = ("Profile")
        verbose_name_plural = ("Profiles")

    def __str__(self):
        return self.user.username

    def user_full_name(self):

        return f'{self.user.first_name} {self.user.last_name}'


class Experience(models.Model):
    user = models.ForeignKey(
        User, related_name='user_experience', on_delete=models.CASCADE)
    company_name = models.CharField(max_length=400)
    job_title = models.CharField(max_length=400, blank=True, null=True)
    location = models.CharField(max_length=400, blank=True, null=True)
    from_date = models.DateField(auto_now=False, auto_now_add=False)
    to_date = models.DateField(
        auto_now=False, auto_now_add=False, blank=True, null=True)
    is_current = models.BooleanField()
    desc = models.CharField(max_length=5000)
    profile_id = models.ForeignKey(
        Profile,  on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.company_name

    class Meta:
        verbose_name = 'Experience'
        verbose_name_plural = 'Experiences'


class Education(models.Model):
    user = models.ForeignKey(
        User, related_name='user_education', on_delete=models.CASCADE)
    sch_name = models.CharField(max_length=400)
    from_date = models.DateField(auto_now=False, auto_now_add=False)
    to_date = models.DateField(
        auto_now=False, auto_now_add=False, blank=True, null=True)
    is_current = models.BooleanField()
    desc = models.CharField(max_length=5000)
    field_of_study = models.CharField(max_length=100, blank=True, null=True)
    degree = models.CharField(max_length=200, blank=True, null=True)
    profile_id = models.ForeignKey(
        Profile, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.sch_name

    class Meta:
        verbose_name = 'Education'
        verbose_name_plural = 'Educations'


@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        image_url = get_gravatar_image_url(instance.email)
        Profile.objects.create(user=instance, image_url=image_url)
    instance.profile.save()
