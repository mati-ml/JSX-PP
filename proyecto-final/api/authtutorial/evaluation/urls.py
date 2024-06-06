from django.urls import path
from evaluation .views import *

urlpatterns = [
    path('delete-teachers-evaluations/', delete_teachers_evaluations, name='delete_teachers_evaluations'),
    path('modify-evaluation/', ModifyEvaluation.as_view(), name='modify_evaluation')
]
