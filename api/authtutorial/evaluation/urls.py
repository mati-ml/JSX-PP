from django.urls import path
from evaluation .views import *

urlpatterns = [
    path('delete-teachers-evaluations/', delete_teachers_evaluations, name='delete_teachers_evaluations'),
    path('inscripcion-pasantias/', ModifyEvaluation.as_view(), name='modify_evaluation'),
    path('pendientes/',PendientesListView.as_view()),
    path('reunion/',ReunionListView.as_view()),
    path('estado-reunion/',UpdateReunionStatus.as_view()),
    path('estado-pasantia/',UpdateEstadoStatus.as_view()),
    path('get-evaluation-details/', GetEvaluationDetails.as_view(), name='get-evaluation-details'),
    path('evaluacion/',Evaluar.as_view())
]
