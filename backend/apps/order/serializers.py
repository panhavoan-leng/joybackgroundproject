from rest_framework.generics import ListCreateAPIView
from .models import Order, OrderItem
from rest_framework import serializers


class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'
    
    def validate(self, data):
        errors = {}
        if 'full_name' not in data or not data['full_name']:
            errors['full_name'] = ['full_name is required.']

        if 'total_price' not in data or not data['total_price']:
            errors['total_price'] = ['total_price is required.']

        if 'address_line1' not in data or not data['address_line1']:
            errors['address_line1'] = ['address_line1 is required.']

        if 'address_line2' not in data or not data['address_line2']:
            errors['address_line2'] = ['address_line2 is required.']

        if 'city' not in data or not data['city']:
            errors['city'] = ['city is required.']

        if 'state' not in data or not data['state']:
            errors['state'] = ['state is required.']

        if 'postal_code' not in data or not data['postal_code']:
            errors['postal_code'] = ['postal_code is required.']

        if 'country' not in data or not data['country']:
            errors['country'] = ['country is required.']

        if 'telephone' not in data or not data['telephone']:
            errors['telephone'] = ['telephone is required.']

        if bool(errors):
            raise serializers.ValidationError(errors)

        return data

class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = '__all__'