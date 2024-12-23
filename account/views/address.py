from rest_framework.response import Response
from account.serializers import AddressSerializer
from account.models import Address
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def get_addresses(request):
    addresses = Address.objects.filter(user=request.user)
    serializer = AddressSerializer(addresses, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def create_address(request):
    data = request.data.copy()
    data['user_id'] = request.user.id  # Ensure the user is set as the owner of the address
    serializer = AddressSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": "Address added"}, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response({"error": "Add all fields"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated,))
def manage_address(request, pk):
    try:
        address = Address.objects.get(pk=pk, user=request.user)  # Check if the address belongs to the user
    except Address.DoesNotExist:
        return Response({"error": "Address not found or you do not have permission."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AddressSerializer(address)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        serializer = AddressSerializer(address, data=request.data, partial=True)  # Allow partial updates
        if serializer.is_valid():
            serializer.save()
            return Response({"success": "Address updated"}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid data provided"}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        address.delete()
        return Response({"success": "Address deleted."}, status=status.HTTP_200_OK)
