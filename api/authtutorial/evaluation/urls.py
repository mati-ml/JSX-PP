from django.urls import path
from evaluation .views import *

urlpatterns = [
    path('delete-teachers-evaluations/', delete_teachers_evaluations, name='delete_teachers_evaluations'),
    path('inscripcion-pasantias/', ModifyEvaluation.as_view()),
    path('pendientes/',PendientesListView.as_view()),
    path('reunion/',ReunionListView.as_view()),
    path('estado-reunion/',UpdateReunionStatus.as_view()),
    path('estado-pasantia/',UpdateEstadoStatus.as_view()),
    path('get-evaluation-details/', GetEvaluationDetails.as_view(), name='get-evaluation-details'),
    path('evaluacion/',Evaluar.as_view()),
    path('update/<str:email>/', update_data, name='update_data'),
    path('formulario/<str:email>/',ciclo,name='envio'),
    path('proyecto/',ModifyResumen.as_view()),
    path('upload/',FileUploadView.as_view()),
    path('rubrica1/',DocumentDownloadView1.as_view()),
    path('rubrica2/',DocumentDownloadView2.as_view()),
    path('rubrica3/',DocumentDownloadView3.as_view()),
    path('alumnos/',GetUserEmailsByTeacher.as_view()),
    path('eval1/',Notas1.as_view()),
    path('eval2/',Notas2.as_view()),
    path('eval3/',Notas3.as_view()),
    path('pasos/',count_users_by_step),
    path('testyou/',EvaluarEmp.as_view()),
    path('obevalpas/',ObtenerEvaluacionPas.as_view()),
    path('requisitos/',PendientesListViewRequ.as_view()),
    path('editreq/',UpdateReq.as_view()),
    path('alcerrar/',Cerrar.as_view()),
    path('cerrar/',UpdateCerr.as_view())
]
