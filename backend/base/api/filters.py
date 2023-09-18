from django_filters import FilterSet

# Models
from base.models import TokenOTP


class TokenOTPFilter(FilterSet):
    class Meta:
        model = TokenOTP
        fields = {
            "user__id": ["exact"],
            "token": ["icontains"],
            "is_used": ["exact"],
            "is_active": ["exact"],
            "created_at": ["gte", "lte", "exact", "range"],
        }
