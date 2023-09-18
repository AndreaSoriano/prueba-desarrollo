# Django Rest Framework
from rest_framework import status
from rest_framework.viewsets import GenericViewSet
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
)
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

# Django
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404

# Django Filters
from django_filters.rest_framework import DjangoFilterBackend

# Serializers
from base.api.serializers import UserSerializer, TokenOTPSerializer

# Models
from base.models import TokenOTP

# Filters
from base.api.filters import TokenOTPFilter

import pyotp
import time
from threading import Thread


class RegisterView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        user_form = UserCreationForm(request.data)
        if user_form.is_valid():
            instance = user_form.save()
            Token.objects.create(user=instance)
            user = UserSerializer(instance)
            return Response("Usuario {0} creado!".format(user.data["username"]))
        return Response(user_form.errors.values(), status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response(
                {
                    "user": UserSerializer(user).data["username"],
                    "token": get_object_or_404(Token, user=user).key,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"detail": "Error en el inicio de sesión"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response(
            {"detail": "Inicio de sesion exitoso!"}, status=status.HTTP_200_OK
        )


class TokensView(ListAPIView, GenericViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = TokenOTPSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = TokenOTPFilter

    def get_queryset(self):
        queryset = TokenOTP.objects.filter(user=self.request.user)
        return queryset


max_tokens = 5
tokens_generated = 0
stop_generate_tokens = False
generate_tokens_thread = None


class GenerateTokensView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        global generate_tokens_thread

        if not generate_tokens_thread or not generate_tokens_thread.is_alive():
            global tokens_generated
            global stop_generate_tokens

            tokens_generated = 0
            stop_generate_tokens = False

            generate_tokens_thread = Thread(target=generate_tokens, args=[request.user])
            generate_tokens_thread.daemon = True
            generate_tokens_thread.start()

            return Response(
                {"detail": "Generación de tokens iniciada"}, status=status.HTTP_200_OK
            )

        else:
            return Response(
                {"detail": "Generación de tokens ya está en curso"},
                status=status.HTTP_400_BAD_REQUEST,
            )


def generate_tokens(user):
    global tokens_generated

    while tokens_generated < max_tokens and not stop_generate_tokens:
        totp = pyotp.TOTP("base32secret3232")
        token = totp.now()

        # Guardar el token en la base de datos
        otp_token = TokenOTP(user=user, token=token)
        TokenOTP.objects.filter(user=user, is_active=True).update(is_active=False)
        otp_token.save()

        tokens_generated += 1

        time.sleep(15)  # Esperar 60 segundos antes de generar el siguiente token

    if tokens_generated == max_tokens or stop_generate_tokens:
        TokenOTP.objects.filter(user=user, is_active=True).update(is_active=False)


class StopGenerateTokensView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        global stop_generate_tokens

        user = request.user

        TokenOTP.objects.filter(user=user, is_active=True).update(is_active=False)

        stop_generate_tokens = True
        return Response(
            {"detail": "Generación de tokens detenida"}, status=status.HTTP_200_OK
        )


class UseGeneratedTokenView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        global stop_generate_tokens

        input_token = request.data.get("token", None)
        user = request.user

        last_token_active = TokenOTP.objects.filter(
            user=user, is_active=True, is_used=False
        ).last()
        if input_token == None:
            return Response(
                {"detail": "Se esperaba un token"}, status=status.HTTP_400_BAD_REQUEST
            )
        if last_token_active != None:
            if input_token == last_token_active.token:
                last_token_active.is_active = False
                last_token_active.is_used = True
                last_token_active.save()

                stop_generate_tokens = True
                return Response(
                    {"detail": "Ingresó correctamente el token"},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"detail": "Token incorrecto"}, status=status.HTTP_400_BAD_REQUEST
                )
        else:
            return Response(
                {"detail": "No tiene token activo"}, status=status.HTTP_400_BAD_REQUEST
            )
