from django.db import models

# Create your models here.
class ReactModel(models.Model):
    employee = models.CharField(max_length=30)
    emailid = models.EmailField(max_length=200)
    