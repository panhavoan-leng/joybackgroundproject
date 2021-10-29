from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from ..user.mixins import CustomLoginRequiredMixin
from .models import OrderItem, Order
from apps.cart.models import Cart
from .serializers import OrderSerializer
from django.core import serializers
from .models import Order, OrderItem
from .forms import OrderForm, OrderItemForm
import json

# Create your views here.
class OrderAdd(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def post(self, request, *args, **kwargs):
        serializer = OrderSerializer()
        serializer.validate(request.data)

        # Save to order
        request.data._mutable = True

        order = Order.objects.create(
            full_name= request.data['full_name'],
            total_price= request.data['total_price'],
            address_line1= request.data['address_line1'],
            address_line2= request.data['address_line2'],
            city= request.data['city'],
            state= request.data['state'],
            postal_code= request.data['postal_code'],
            country= request.data['country'],
            telephone= request.data['telephone'],
            user_id= request.login_user.id,
        )

        # Get cart items of login user
        carts = Cart.objects.filter(user_id=request.login_user.id)
        # Save to order items
        for cart in carts:
            order_item_form = OrderItemForm({"order_id": order.id, "item_id":cart.item_id.id, "quantity":cart.quantity})
            order_item_form.save()
        
        # Delete cart items
        carts.delete()
            
        serializer = OrderSerializer([order], many=True)
        return Response(serializer.data[0])
