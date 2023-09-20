from django.urls import path
from rest_framework.routers import SimpleRouter
from rest_framework.authtoken import views as token_view

from base.api.views import (
    RegisterView,
    LoginView,
    LogoutView,
    TokensView,
    GenerateTokensView,
    StopGenerateTokensView,
    UseGeneratedTokenView,
)

router = SimpleRouter(trailing_slash=False)

router.register(r"tokens", TokensView, basename="tokens")

urlpatterns = [
    path("api-token-auth", token_view.obtain_auth_token),
    path("register", RegisterView.as_view()),
    path("login", LoginView.as_view()),
    path("logout", LogoutView.as_view()),
    path("generate_tokens", GenerateTokensView.as_view()),
    path("stop_generate_tokens", StopGenerateTokensView.as_view()),
    path("use_generated_token", UseGeneratedTokenView.as_view()),
]

urlpatterns += router.urls
