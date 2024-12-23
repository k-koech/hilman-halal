import os
from django.conf import settings
from rest_framework.response import Response
from account.serializers import ProductSerializer
from account.models import Product, Category
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework import viewsets, status
from rest_framework.decorators import permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from django.core.files.storage import default_storage
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist


@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_product(request):
    print("Request Data: ", request.data)  # Debugging

    # Validate category existence before passing to the serializer
    category_id = request.data.get('category')
    if category_id:
        try:
            category = Category.objects.get(pk=category_id)
        except Category.DoesNotExist:
            return Response(
                {"error": "Invalid category ID"},
                status=status.HTTP_400_BAD_REQUEST
            )

    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": "Product added"}, status=status.HTTP_201_CREATED)
    print("Errors: ", serializer.errors)  # Debugging
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'PUT', 'DELETE'])
def manage_product(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success":"Product updated"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if product.image:
            image_path = product.image.path
            if os.path.isfile(image_path):
                os.remove(image_path)

                # Check if the folder is empty, and delete it if so
                folder_path = os.path.dirname(image_path)
                if not os.listdir(folder_path):  # Check if the directory is empty
                    os.rmdir(folder_path)  # Remove the directory

        # Delete the product recordord
        product.delete()
  
        return Response({"success": "Product and associated image deleted."}, status=status.HTTP_204_NO_CONTENT)