
from django.contrib import admin
from django.urls import include, path, re_path
# from backend.settings import settings
from django.conf import settings
from django.conf.urls.static import static
from account.views.users import index

urlpatterns = [  
    path('admin/', admin.site.urls), 
    # path('auth/',include('drf_social_oauth2.urls',namespace='drf')), # add this

    path("", include("account.urls") ),
    re_path(".*", index),


] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

