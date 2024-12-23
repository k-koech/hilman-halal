from datetime import timedelta
import os
from pathlib import Path
# from decouple import config

# for production
# import pymysql
# pymysql.install_as_MySQLdb()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure--&#ee_y4sd-72-izs%*gh+7l=8=$u#r+neom16wy3rlwk@-tt&'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Add the URL of your frontend
]
AUTH_USER_MODEL = 'account.user'



# Email
# # Local email configurations
# EMAIL_USE_SSL = True
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_PORT = 465
# EMAIL_USE_TLS = False
# EMAIL_HOST_USER = ''
# EMAIL_HOST_PASSWORD ='nekunvsnjsniqupu'

# Production email
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'mail.nairobidevops.org' 
EMAIL_HOST_USER = 'noreply@nairobidevops.org'
DEFAULT_FROM_EMAIL = "nairobidevops.org"
EMAIL_HOST_PASSWORD = 'MbK&5^PXxnF4' 
EMAIL_PORT = 465
EMAIL_USE_SSL = True
EMAIL_USE_TLS = False
# EMAIL_USE_SSL = False
# EMAIL_USE_TLS = False
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'mail.developerske.com' 
# EMAIL_HOST_USER = 'noreply@developerske.com'
# DEFAULT_FROM_EMAIL = "developerske.com"
# EMAIL_HOST_PASSWORD = 'bu@5f+Hg2[0z' 
# EMAIL_PORT = 465




# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'account',
    'corsheaders',
    'rest_framework',
    'rest_framework.authtoken',
  
    # "rest_framework_jwt",

    # for social auth
    # 'drf_social_oauth2',
    # 'oauth2_provider',
    # 'social_django',

]

CORS_ORIGIN_ALLOW_ALL = True
# CORS_ORIGIN_WHITELIST = (
#   'http://localhost:5173','http://127.0.0.1:5173'
# )

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        #   Social Auth
        # 'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        # 'drf_social_oauth2.authentication.SocialAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny', 
        )
}

#--- for social auth -----
# AUTHENTICATION_BACKENDS = (
#     # Google OAuth2
#     'social_core.backends.google.GoogleOAuth2',
#     # drf-social-oauth2
#     'drf_social_oauth2.backends.DjangoOAuth2',
#     # Django
#     'django.contrib.auth.backends.ModelBackend',
# )

# Google configuration
# SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = config("SOCIAL_AUTH_GOOGLE_OAUTH2_KEY")
# SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = config("SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET")

# Define SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE to get extra permissions from Google.
# SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = [
#     'https://www.googleapis.com/auth/userinfo.email',
#     'https://www.googleapis.com/auth/userinfo.profile',
# ]

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=120),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'AUTH_HEADER_TYPES': ('Bearer',),
}

MIDDLEWARE = [
    # cors
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # 'DIRS': [],
        'DIRS': [os.path.join(BASE_DIR / 'frontend/dist')],
        'APP_DIRS': True,  
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                # Social Auth
                # 'social_django.context_processors.backends', #add
                # 'social_django.context_processors.login_redirect', #add
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'itnxthev_hilman',
#         'HOST':'localhost',
#         'USER':'itnxthev_triplek',
#         'PASSWORD': '^CoaXzWC}PHa',
#         }
# }


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/


# development
STATIC_URL = '/assets/'
STATIC_ROOT = os.path.join(BASE_DIR / 'assets')
STATICFILES_DIRS = (os.path.join(BASE_DIR / 'frontend/dist/assets')),

MEDIA_URL = '/files/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'files/')

# production
# STATIC_URL = '/assets/'
# STATIC_ROOT =  '/home/nairobid/public_html/assets'

# MEDIA_URL = '/files/'
# MEDIA_ROOT = '/home/nairobid/public_html/api/files/'

 


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
