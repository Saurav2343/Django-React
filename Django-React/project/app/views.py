from django.shortcuts import render
from rest_framework.views import APIView
from .models import ReactModel
from .serializer import ReactSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class ReactView(APIView):
    def get(self, request):
        output = [ {
            'employee': output.employee,
            'emailid': output.emailid
        }
        for output in ReactModel.objects.all()]
        return Response(output)
    def post(self, request):
        # data = {'message': 'POST request received successfully'}
        # return Response(data, status=status.HTTP_201_CREATED)
        sr = ReactSerializer(data=request.data)
        if sr.is_valid(raise_exception=True):
            sr.save()
            return Response(sr.data, status=status.HTTP_201_CREATED)
        return Response(sr.errors, status=status.HTTP_400_BAD_REQUEST)
        