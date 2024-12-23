import json
import os
from django.conf import settings
from rest_framework.response import Response
from django.http import JsonResponse
from account.serializers import ProfileSerializer
from account.models import Profile
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes


# Permission for data fetching
class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS
    
# =================Art==================================
# fetch profile
@api_view(('GET',))
@permission_classes((IsAuthenticated, ))
def profile(request):    
    queryset = Profile.objects.all().order_by('-id')
    serializer = ProfileSerializer(queryset, many=True)
    return Response(serializer.data)


# Add profile picture
@csrf_exempt
@api_view(('POST',))
@permission_classes((IsAuthenticated, ))
def addProfilePicture(request):    
    image = request.data.get('image')

    serializer = ProfileSerializer(data=request.data)       
    if serializer.is_valid():
        serializer.save(image=image)
        return Response({"success":"Profile picture added successfully"}, status=201)
    
    else:
        return Response({"error":"Something went wrong"}, status=status.HTTP_406_NOT_ACCEPTABLE)



# Update art
@csrf_exempt
@api_view(('PATCH',))
@permission_classes((IsAuthenticated, ))
def updateArt(request, pk=None):    
    title = request.data.get('title')
    description = request.data.get('description')
    price = request.data.get('price')
    image = request.data.get('image')
    addToTop = json.loads(request.data.get('addToTop'))

    arts = Art.objects.filter(pk=pk).count()
    if arts > 0 and image!=None:
        art = Art.objects.get(pk=pk)
            # Check first if the file exists before deleting from the directory
        if os.path.exists(os.path.join(settings.MEDIA_ROOT, str(art.image)) ):
            os.remove(os.path.join(settings.MEDIA_ROOT, str(art.image) ))

            dir = os.path.join(settings.MEDIA_ROOT, ("/".join(str(art.image).split("/",-2)[:2])) )
            list_dir = os.listdir(dir)
            print("Dir length ",len(list_dir))
            if len(list_dir) == 0:
                os.rmdir(dir)

        art = Art.objects.get(pk=pk)
        serializer = ArtSerializer(art,data=request.data)       
        if serializer.is_valid():
            serializer.save(title=title,description=description,
            price=price,image=image,is_topart=addToTop, user=request.user)
            return Response({"success":"Updated successfully!!"},status=201)
        else:
            return Response({"errors":serializer.errors},status=201)
    
    if arts > 0 and image==None:
        art = Art.objects.get(pk=pk)
        serializer = ArtSerializer(art,data=request.data)       
        if serializer.is_valid():
            serializer.save(title=title,description=description,
            price=price,is_topart=addToTop, user=request.user)
            return Response({"success":"Updated successfully!!"},status=201)
        else:
            return Response({"errors":serializer.errors},status=201)

    else:
        return Response({"error":"The Art you're trying to update doesn't exist"}, status=status.HTTP_406_NOT_ACCEPTABLE)

@csrf_exempt
@api_view(('DELETE',))
@permission_classes((IsAuthenticated, ))
def deleteArt(request, pk=None):    
    arts = Art.objects.filter(pk=pk).count()
    if arts > 0:        
        art = Art.objects.get(pk=pk)

        # Check first if the file exists before deleting from the directory
        if(art.image):
            if os.path.exists(os.path.join(settings.MEDIA_ROOT, str(art.image)) ):
                os.remove(os.path.join(settings.MEDIA_ROOT, str(art.image) ))

                dir = os.path.join(settings.MEDIA_ROOT, ("/".join(str(art.image).split("/",-2)[:2])) )
                list_dir = os.listdir(dir)
                print("Dir length ",len(list_dir))
                if len(list_dir) == 0:
                    os.rmdir(dir)
            else:
                print("PATH DOES NOT EXIST")

        art.delete()
        return Response({"success":"Art deleted Successfully!"},status=201)

    else:
        return Response({"error":"Art does not exist!"},status=status.HTTP_204_NO_CONTENT)


