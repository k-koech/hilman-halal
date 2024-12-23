from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views.profile import addProfilePicture, profile
from .views.users import index,update_password, register_user,delete_user,register_with_google,login_with_google, register_admin, send_password, sendMessage, update_password,users, current_user, partnersMessage
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView, TokenVerifyView)
from django.urls import include
# from account.profile import get_profiles, create_profile, manage_profile
from .views.products import get_products, create_product, manage_product
from .views.address import  get_addresses, create_address, manage_address
from .views.orders import  get_orders,get_all_orders, create_order, manage_order, update_order_status
# ,manage_order_item
from .views.category import get_categories, create_category, manage_category
# from .views.payments import get_payments, create_payment, manage_payment


urlpatterns = [
    path('users', users),
    
    path('users/register', register_user),


    path('users/addstaff', register_admin),
    path('users/sendemail', sendMessage),
    path("users/current_user", current_user ),
    path("user/updatepassword", update_password),
    path('users/register_with_google', register_with_google),
    path('auth/login_with_google', login_with_google),

    path("users/resetpassword", send_password ),
    path("users/<int:pk>",delete_user),

    # Category URLs
    path('categories/', get_categories, name='get_categories'),
    path('categories/create/', create_category, name='create_category'),
    path('categories/<int:pk>/', manage_category, name='manage_category'),

    # Product URLs
    path('products/', get_products, name='get_products'),
    path('products/create/', create_product, name='create_product'),
    path('products/<int:pk>/', manage_product, name='manage_product'),

    # Order URLs
    path('orders/', get_orders, name='get_orders'),
    path('orders/all/', get_all_orders, name='get_all_orders'),

    path('orders/create/', create_order, name='create_order'),
    path('orders/<int:pk>/', manage_order, name='manage_order'),
    path('order/<int:order_id>/status/', update_order_status, name='update_order_status'),

    # Address URLs
    path('addresses/', get_addresses, name='get_addresses'),
    path('addresses/create/', create_address, name='create_address'),
    path('addresses/<int:pk>/', manage_address, name='manage_address'),

    # Payment URLs
    # path('payments/', get_payments, name='get_payments'),
    # path('payments/create/', create_payment, name='create_payment'),
    # path('payments/<int:pk>/', manage_payment, name='manage_payment'),

    path('token/', TokenObtainPairView.as_view()),
    path('token/verify/', TokenVerifyView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),



] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
