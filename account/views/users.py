from django.utils import timezone
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from ..email import send_message, send_reset_password, send_staff_credentials, partner_message
from account.serializers import PasswordResetSerializer, UserSerializer
from account.models import PasswordResetToken, User, Profile
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404


from rest_framework_simplejwt.tokens import RefreshToken
import requests
import string    
import random  



def index(request):
    return render(request, "index.html")

# Permission for data fetching
class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS
    

# ======================================================
# fetch users
@api_view(('GET',))
@permission_classes((IsAuthenticated, ))
def users(request):    
    queryset = User.objects.all().order_by("-id")
    # filter(is_staff=True).order_by('-id')
    serializer = UserSerializer(queryset, many=True)
    return Response(serializer.data)


# Create a new user
@csrf_exempt
@api_view(('POST',))
def register_user(request):    
    data = request.data
    serializer = UserSerializer(data=data)

    email = request.data.get('email')
    password = request.data.get('password')

    email_exists=User.objects.filter(email=email).count()

    if(email_exists > 0):
        return Response({"email_error":"User with this email already exist!"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    else:
        serializer = UserSerializer(data=request.data)            
        if serializer.is_valid():
            # profile = Profile()
            profile = Profile.objects.create()
            serializer.save(
                email=email,
                # is_admin=True,
                profile=profile,
                password=make_password(password),
            )
            return Response({"success":"User created successfully!"}, status=201)
        else:
            return Response({"error":"Something went wrong!"}, status=status.HTTP_406_NOT_ACCEPTABLE)


# Create a new user with google
@csrf_exempt
@api_view(('POST',))
def register_with_google(request):    
    data = request.data
    serializer = UserSerializer(data=data)

    email = request.data.get('email')
    picture = request.data.get('picture')


    email_exists=User.objects.filter(email=email).count()

    if(email_exists > 0):
        return Response({"email_error":"User with this email already exist!"}, status=status.HTTP_406_NOT_ACCEPTABLE)
   
    else:
        serializer = UserSerializer(data=request.data)            
        if serializer.is_valid():
            profile = Profile(google_profile_image=picture)
            profile.save()
            serializer.save(
                email=email,
                # is_admin=True,
                profile=profile
            )
            return Response({"success":"User created successfully!"}, status=201)
        else:
            return Response({"error":"Something went wrong!"}, status=status.HTTP_406_NOT_ACCEPTABLE)

# google login
@csrf_exempt
@api_view(('POST',))
def login_with_google(request):   
    id_token = request.data.get('token')
    print("xxxx ", id_token)
    # Verify the Google OAuth token with Google's servers
    response = requests.get(f'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={id_token}')
    google_data = response.json()
    print("Token ", google_data)

    if google_data.get('email_verified'):
        # You need to create or get the user based on the Google data
        user_count = User.objects.filter(email=google_data['email']).count()
        
        if user_count==1:
            user = User.objects.get(email=google_data['email'])
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({'access': access_token})
        else:
            return Response({"error":"User does not exist, please register with google first!"}, status=status.HTTP_406_NOT_ACCEPTABLE)


    else:
        return Response({'error': 'Google OAuth token verification failed'}, status=status.HTTP_400_BAD_REQUEST)


# Create a new admin 
@csrf_exempt
@api_view(('POST',))
def register_admin(request):    
    data = request.data
    serializer = UserSerializer(data=data)

    email = request.data.get('email')        
    password = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 6))    

 
    email_exists=User.objects.filter(email=email).count()
    if(email_exists > 0):
        return Response({"email_error":"User with this email already exist!"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    else:
        serializer = UserSerializer(data=request.data)            
        if serializer.is_valid():
            serializer.save(
                is_staff=True,
                email=email,
                password=make_password(password)
            )
            print("pion ")
            try:
                send_staff_credentials(password, email)
                return Response({"success":"Staff added successfully!"}, status=201)
            # print("operate ", x)
            except Exception as e:
                print(f"Failed to send email: {e}")
                return Response({"errro":"Error sending user email!"}, status=201)
        else:
            return Response(serializer.errors, status=400)



# Send new password to user
@csrf_exempt
@api_view(('POST',))
def send_password(request):    
    email=request.data.get('email')
    random_password = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 5))    

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"email_error":"User with this email doesn't exist!"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    if request.method=="POST":
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            # user.id,
            user = serializer.save(password = make_password(random_password))
            # send_reset_password(user.email,random_password,email)
            return Response({"success":"Email sent, check email!"}, status=201)
        else:
            return Response({"error":"Something went wrong!"}, status=201)

# Update new password to user
@csrf_exempt
@api_view(('PATCH',))
@permission_classes((IsAuthenticated, ))
def update_password(request):    
    oldpassword=request.data.get('oldpassword')
    newpassword=request.data.get('newpassword')

    try:
        user = User.objects.get(email=request.user.email)
    except User.DoesNotExist:
        return Response({"email_error":"User with this email doesn't exist!"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    if request.method=="PATCH":
        user=User.objects.get(email=request.user.email)
        print("Check pass ",user.check_password(oldpassword))
        if user.check_password(oldpassword):
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                user = serializer.save(password = make_password(newpassword))
                return Response({"success":"Password updated successfully!"}, status=201)
            else:
                return Response({"error":"All fields must be filled"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response({"error":"Your old password doesn't match with our records!"}, status=status.HTTP_406_NOT_ACCEPTABLE)


@csrf_exempt
@api_view(('DELETE',))
@permission_classes((IsAuthenticated, ))
def delete_user(request, pk=None):
    user = User.objects.filter(pk=pk).count()
    if user > 0:
        user = User.objects.get(pk=pk)
        user.delete()
        return Response({"success":"Deleted Successfully!"},status=201)
    else:
        return Response({"error":"User does not exist!"},status=status.HTTP_406_NOT_ACCEPTABLE)



# Update new password to user
@csrf_exempt
@api_view(('PATCH',))
@permission_classes((IsAuthenticated, ))
def update_password(request):    
    oldpassword=request.data.get('oldpassword')
    newpassword=request.data.get('newpassword')

    try:
        user = User.objects.get(email=request.user.email)
    except User.DoesNotExist:
        return Response({"email_error":"User with this email doesn't exist!"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    if request.method=="PATCH":
        user=User.objects.get(email=request.user.email)
        # print("Check pass ",user.check_password(oldpassword))
        if user.password=="" or user.check_password(oldpassword):
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                user = serializer.save(password = make_password(newpassword))
                return Response({"success":"Password updated successfully!"}, status=201)
            else:
                return Response({"error":"Something went wrong!"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response({"password_error":"Your old password doesn't match with our records!"}, status=status.HTTP_406_NOT_ACCEPTABLE)




# Send user message 
@csrf_exempt
@api_view(('POST',))
def sendMessage(request):    
    # subject=request.data.get('subject')
    message=request.data.get('message')
    email=request.data.get('email')  
    name=request.data.get('name') 

    if request.method=="POST":
        send_message(name,message, email)
        return Response({"success":"Email sent succesfully!"}, status=201)

@api_view(['GET'])
def current_user(request):
    user = request.user
    user = UserSerializer(user)
    return Response(user.data)


# Send partners message 
@csrf_exempt
@api_view(('POST',))
def partnersMessage(request):    
    name=request.data.get('name')
    message=request.data.get('description')
    email=request.data.get('email')

    if request.method=="POST":
        partner_message(name, message, email)
        return Response({"success":"Email sent succesfully!"}, status=201)

