from django.shortcuts import render
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt
import datetime
import json
from .utils import send_email

# Create your views here.

class registerAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)   #if anything not valid, raise exception
        serializer.save()
        return Response(serializer.data)


class LoginAPIView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        #find user using email
        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found:)')
            
        if not user.check_password(password):
            raise AuthenticationFailed('Invalid password')

       
        payload = {
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            "iat": datetime.datetime.utcnow()
        }

        #token = jwt.encode(payload, 'secret', algorithm='HS256')
        # token.decode('utf-8')
        #we set token via cookies
        

        response = Response() 
        response.set_cookie('user_email', user.email)
        #response.set_cookie(key='jwt', value=token, httponly=True)  #httonly - frontend can't access cookie, only for backend
        #response.set_cookie('user_id', user.id)
        response.data = {
            'user_role': user.role,
            'user_id': user.id,
            'user_email':user.email
        }

        #if password correct
        return response


# get user using cookie
class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed("Unauthenticated!")
        
        try:
            payload = jwt.decode(token, 'secret', algorithms="HS256")
            #decode gets the user

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Unauthenticated!")
        
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)
        #cookies accessed if preserved


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        # Eliminar cookies
        response.delete_cookie('user_id')
        response.delete_cookie('user_email')
        response.delete_cookie('csrftoken')
        response.delete_cookie('user_role')
        
        response.data = {
            'message': 'Logout successful'
        }
        
        return response


class TeacherListView(APIView):
    def get(self, request):
        # Filtra los usuarios por el nombre 'teacher'
        teachers = User.objects.filter(role__iexact='teacher')

        if not teachers.exists():
            raise NotFound('No users found with the role "teacher".')

        # Serializa solo los nombres de los usuarios
        teacher_names = [teacher.email for teacher in teachers]

        # Devuelve los nombres como JSON
        response_data = {'teacher_names': teacher_names}

        # Imprime los nombres en la consola del servidor
        print("Nombres de profesores:", json.dumps(response_data))

        return Response(response_data)
    
class registerAPIViewAdmin(APIView):
    def post(self, request):
        data=request.data
        print(data)
        serializer = UserSerializer(data=request.data)
        user_email=data['email']
        user_pass=data['password']
        mensaje= f'Su usuario es: {user_email}\n La contrasena es: {user_pass}'
        send_email(user_email, f'Ha sido registrado como admin' , mensaje)
        serializer.is_valid(raise_exception=True)   #if anything not valid, raise exception
        serializer.save()
        return Response(serializer.data)