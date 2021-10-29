from django.db import models
from django.db.models.fields import EmailField
from cloudinary.models import CloudinaryField


class User(models.Model):
    class Meta(object):
        db_table = 'user'
    username = models.CharField(
        'Username', blank=False, max_length=50, db_index=True
    )
    password = models.CharField(
        'Password', blank=False, null=False, max_length=500, db_index=True, default='Anonymous'
    )
    email = models.EmailField(
        'Email', blank=False, max_length=254, db_index=True 
    )
    token = models.CharField(
        'Token', blank=True, null=True, max_length=500, db_index=True
    )
    token_expires_at = models.DateTimeField(
        'Token Expires Datetime', blank=True, null=True
    )
    created_at = models.DateTimeField(
        'Created Datetime', blank=True, auto_now_add=True
    )
    updated_at = models.DateTimeField(
        'Updated Datetime', blank=True, auto_now=True
    )