from django.conf.urls.static import static
from django.urls.conf import path, include

from django.contrib import admin

from backend import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('cybersport.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
