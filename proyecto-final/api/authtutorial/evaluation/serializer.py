from rest_framework import serializers
from .models import Eval

class OtherModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eval
        fields = '__all__'