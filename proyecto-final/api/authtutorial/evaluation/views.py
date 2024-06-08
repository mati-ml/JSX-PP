from django.http import JsonResponse, HttpResponse
from users.models import User
from rest_framework import status
from evaluation.models import Eval
import json
from .serializer import OtherModelSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from evaluation.models import Eval
from .serializer import OtherModelSerializer

class ModifyEvaluation(APIView):
    def post(self, request):
        # Obtener los datos de la solicitud
        user_id = request.data.get('user_id')
        fecha_ini = request.data.get('fecha_ini')
        fecha_ter = request.data.get('fecha_ter')
        nombre_emp = request.data.get('nombre_emp')
        rut_emp = request.data.get('rut_emp')
        sup_email = request.data.get('sup_email')
        nombre_sup = request.data.get('nombre_sup')
        rut_sup = request.data.get('rut_sup')
        resumen = request.data.get('resumen')
        teacher=request.data.get('teacher')

        # Validar que se proporciona un ID de usuario y un ID de evaluación
        if not user_id or not user_id:
            return Response({"error": "Se requieren un ID de usuario y un ID de evaluación válidos."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Obtener la instancia de evaluación asociada al usuario y al ID de evaluación
            eval_instance = Eval.objects.get(user_id=user_id)
        except Eval.DoesNotExist:
            return Response({"error": "No se encontró ninguna evaluación asociada al usuario y al ID de evaluación proporcionados."}, status=status.HTTP_404_NOT_FOUND)

        # Actualizar los campos si se proporcionan nuevos valores
        if fecha_ini:
            eval_instance.fecha_ini = fecha_ini
        if fecha_ter:
            eval_instance.fecha_ter = fecha_ter
        if nombre_emp:
            eval_instance.nombre_emp = nombre_emp
        if rut_emp:
            eval_instance.rut_emp = rut_emp
        if sup_email:
            eval_instance.sup_email = sup_email
        if nombre_sup:
            eval_instance.nombre_sup = nombre_sup
        if rut_sup:
            eval_instance.rut_sup = rut_sup
        if resumen:
            eval_instance.resumen = resumen
        if teacher:
            eval_instance.teacher= teacher

        # Guardar los cambios en la base de datos
        eval_instance.save()

        # Serializar la instancia modificada y devolverla como respuesta
        serializer = OtherModelSerializer(eval_instance)
        return Response(serializer.data)





def delete_teachers_evaluations(request):
    # Obtener los usuarios con el rol de 'teacher'
    teachers = User.objects.filter(role='teacher')

    # Obtener los correos electrónicos de estos usuarios
    teacher_emails = teachers.values_list('email', flat=True)

    # Obtener los registros de Eval asociados con los usuarios 'teacher'
    evals_to_delete = Eval.objects.filter(user_email__in=teacher_emails)

    # Eliminar los registros de Eval asociados con los usuarios 'teacher'
    evals_to_delete.delete()

    return HttpResponse("Registros de usuarios con el rol 'teacher' eliminados de Eval.")

