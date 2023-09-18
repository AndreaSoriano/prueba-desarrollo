from rest_framework import serializers

from django.contrib.auth.models import User

from base.models import TokenOTP


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class TokenOTPSerializer(serializers.ModelSerializer):
    class Meta:
        model = TokenOTP
        fields = "__all__"
