from rest_framework.response import Response
from django.http import JsonResponse
from account.serializers import OrderSerializer,OrderItemSerializer
from account.models import Order, OrderItem
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework import  status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.db import transaction  # Import transaction for database atomic operations
from rest_framework.decorators import api_view, permission_classes
import json

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders(request):
    # Filter orders by the current user
    orders = Order.objects.filter(user=request.user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_orders(request):
    # Filter orders by the current user
    if request.user.is_admin or request.user.is_staff:
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    cart = request.data  # Expecting the request data to be a list of cart items
    cart_items = cart["items"]
    if not isinstance(cart_items, list):
        return Response({"error": "Invalid data format. Expected a list of cart items."}, status=status.HTTP_400_BAD_REQUEST)
    
    if not cart_items:
        return Response({"error": "Cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

    with transaction.atomic():
        # Example order data — this should be passed dynamically in real use
        order_data = {
            'total_price': cart["totalCost"],
            "user_id": request.user.id,  
            "address_id": cart['address_id'],  # Replace with the actual address
            "payment_method": "credit_card"  # Replace with the payment method
        }

        # Create the Order
        order_serializer = OrderSerializer(data=order_data)
        if not order_serializer.is_valid():
            return Response({"error":"Fill all fields"}, status=status.HTTP_400_BAD_REQUEST)

        order = order_serializer.save()

        # Prepare Order Items
        order_items_data = []
        for item in cart_items:
            order_items_data.append({
                "order_id": order.id,
                "product_id": item["id"],  # Product ID from the cart
                "quantity": item["quantity"],  # Quantity of the product
                "price_per_item": item["price"],  # Price of the product
                
            })

        # Create Order Items
        order_item_serializer = OrderItemSerializer(data=order_items_data, many=True)
        if not order_item_serializer.is_valid():
            return Response({"error":"Fill all fields"}, status=status.HTTP_400_BAD_REQUEST)

        order_item_serializer.save()
        # "order": order_serializer.data,
        # "order_items": order_item_serializer.data

        return Response({"success":"Order placed successfully"  }, status=status.HTTP_201_CREATED)



@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def manage_order(request, pk):
    try:
        order = Order.objects.get(pk=pk, user_id=request.user.id)
    except Order.DoesNotExist:
        return Response({"error": "Order not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # cancel Order
    elif request.method == 'PUT':
        if order.status in ['SHIPPED', 'DELIVERED', 'CANCELLED']:
            return Response(
                {"error": "Order cannot be cancelled as it is already shipped, delivered, or cancelled."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        order.status = 'CANCELLED'
        order.save()

        serializer = OrderSerializer(order)
        return Response({"success":"Order Cancelled"}, status=status.HTTP_200_OK)


    elif request.method == 'DELETE':
        if request.user.is_admin or request.user.is_staff:
            order.delete()
            return Response({"success": "Order deleted."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Unauthorized."}, status=status.HTTP_401_UNAUTHORIZED)


# Update order status
@api_view(['PATCH',])
@permission_classes([IsAuthenticated])
def update_order_status(request, order_id):
    try:
        # Check if the user is staff or admin
        if not (request.user.is_staff or request.user.is_admin):
            return JsonResponse({"error": "Permission denied. Only staff or admin can update the status."}, status=403)

        # Parse the request body
        body = json.loads(request.body)
        new_status = body.get("status")

        if not new_status:
            return JsonResponse({"error": "Status is required."}, status=400)

        # Fetch the order
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return JsonResponse({"error": "Order not found."}, status=404)

        # Update the status
        order.status = new_status
        order.save()

        return JsonResponse(
            {"success": "Order status updated successfully.", "status": order.status},
            status=200,
        )
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON data."}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
