from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **kwargs):
        """Create and return a `User` with an email, phone number and password."""
        if email is None:
            raise TypeError('Users must have an email.')

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')
        if email is None:
            raise TypeError('Superusers must have an email.')

        user = self.create_user( email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user

class Profile(models.Model):
    google_profile_image = models.CharField( max_length=100) 
    picture =  models.FileField(upload_to='profile/%Y:%m:%d', null=True)  
    created_at = models.DateTimeField(auto_now_add=True)
    phone_number = models.CharField(max_length=13)
    updated_at = models.DateTimeField(auto_now=True)



class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(db_index=True, unique=True,  null=True, blank=True)
    date_joined = models.DateTimeField(verbose_name='date posted', auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    password = models.CharField( max_length=100)
    profile = models.OneToOneField(Profile, blank=False, on_delete=models.CASCADE)

    USERNAME_FIELD = 'email'

    objects = UserManager()

    def __str__(self):
        return f"{self.email}"


class PasswordResetToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=32, unique=True)
    expiration_time = models.DateTimeField()



class Category(models.Model):
    """
    Model to categorize products.
    """
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



class Product(models.Model):
    """
    Model for individual products in the shop.
    """
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()  # Number of items available
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name="products")
    image = models.FileField(upload_to="products/%Y:%m:%d", null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def is_in_stock(self):
        return self.stock > 0

class Address(models.Model):
    """
    Model to store addresses for users and orders.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="addresses")
    country = models.CharField(max_length=100)
    address_line1 = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Order(models.Model):
    """
    Model for customer orders.
    """
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('CONFIRMED', 'Confirmed'),
        ('SHIPPED',  'Shipped'),
        ('DELIVERED', 'Delivered'),
        ('CANCELLED', 'Cancelled'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    address = models.ForeignKey(Address, on_delete=models.CASCADE, related_name="order")
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order #{self.id} - {self.user.email}"

    def calculate_total_price(self):
        total = sum(item.get_total_price() for item in self.items.all())
        self.total_price = total
        self.save()
        return total



class OrderItem(models.Model):
    """
    Model for individual items in an order.
    """
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="order_items")
    quantity = models.PositiveIntegerField()
    price_per_item = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_address = models.ForeignKey(Address, on_delete=models.CASCADE,null=True, related_name="items")

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"

    def get_total_price(self):
        return self.quantity * self.price_per_item




class Payment(models.Model):
    """
    Model for managing payments for orders.
    """
    PAYMENT_METHOD_CHOICES = [
        ('CREDIT_CARD', 'Credit Card'),
        ('PAYPAL', 'PayPal'),
        ('MOBILE_MONEY', 'Mobile Money'),
        ('CASH_ON_DELIVERY', 'Cash on Delivery'),
    ]

    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="payment")
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_status = models.BooleanField(default=False)

    def __str__(self):
        return f"Payment for Order #{self.order.id}"