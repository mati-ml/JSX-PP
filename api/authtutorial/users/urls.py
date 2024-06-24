from django.urls import path, include
from .views import *

urlpatterns = [
    path('register/', registerAPIView.as_view()),
    path('login/', LoginAPIView.as_view()),
    path('user/', UserView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('teachers/', TeacherListView.as_view(), name='teacher-list'),
    path('registeradmin/',registerAPIViewAdmin.as_view())
    
]