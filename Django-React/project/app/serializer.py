from rest_framework.serializers import ModelSerializer
from .models import ReactModel

class ReactSerializer(ModelSerializer):
    class Meta:
        model = ReactModel
        fields = '__all__'