from django.contrib import admin
from django.urls import path, include
from api.urls import router, urlpatterns as registerAndLogoutURLs
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/refresh', TokenRefreshView.as_view(), name='token_refresh')
] + registerAndLogoutURLs # /api/user/register & /api/user/logout
