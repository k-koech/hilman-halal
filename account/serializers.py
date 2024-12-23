from account.models import User,Profile,Category, Product, Order, OrderItem, Address, Payment
from rest_framework import serializers


class ProfileSerializer(serializers.ModelSerializer): 
    picture = serializers.CharField(required=False)
    bio = serializers.CharField(required=False)
    class Meta:
            model = Profile        
            fields = '__all__'

            
class UserSerializer(serializers.ModelSerializer):
    email = serializers.CharField(required=False)
    profile= ProfileSerializer(read_only=True)
    class Meta:
        model = User        
        extra_kwargs = {'password': {'write_only': True}}
        fields = ('id', 'email',"profile", "is_admin","date_joined","is_staff")
        

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    token = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(required=False, allow_blank=True)
    


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)  # Use nested serializer for detailed category info
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    ) 
    # category_id =  serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), required=False)

    class Meta:
        model = Product
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    order_id = serializers.PrimaryKeyRelatedField(
        queryset=Order.objects.all(), source='order', write_only=True
    ) 
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), source='product', write_only=True
    ) 

    class Meta:
        model = OrderItem
        fields  = ['id', 'product', 'product_id','quantity',"order_id", 'price_per_item']

class AddressSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user', write_only=True
    ) 
    user = UserSerializer(required=False)
    class Meta:
        model = Address
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user', write_only=True
    ) 
    items = OrderItemSerializer(many=True, required=False,read_only=True)
    address = AddressSerializer(required=False,read_only=True)
    address_id =  serializers.PrimaryKeyRelatedField(
        queryset=Address.objects.all(), source='address', write_only=True  ) 

    class Meta:
        model = Order
        fields = '__all__'



class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'