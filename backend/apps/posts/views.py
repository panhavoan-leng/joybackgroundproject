from rest_framework import generics
from .serializers import PostSerializer
from django.http import JsonResponse
from .models import Post
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated

class PostList(generics.ListAPIView):
    authentication_classes = [BasicAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    # Get all posts, limit = 20
    queryset = Post.objects.order_by('created_at').reverse().all()[:20]
    serializer_class = PostSerializer


class PostAdd(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDetail(generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDelete(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
