from django.http import JsonResponse, HttpResponse
from users.models import User
from rest_framework import status
from evaluation.models import Eval
import json
from .serializer import OtherModelSerializer
from rest_framework.exceptions import NotFound
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from evaluation.models import Eval
from .serializer import OtherModelSerializer
from .utils import send_email
from .utils import programar_envio
import pandas as pd
from datetime import datetime, timedelta,date
from pandas.tseries.offsets import CustomBusinessMonthEnd
from django.shortcuts import redirect
# from.utils import ciclo_envio
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
        teacher=request.data.get('teacher')
        estado=request.data.get('Estado')
        nombres= User.objects.get(id=user_id)
        nombre_alumno= nombres.name

        # Validar que se proporciona un ID de usuario y un ID de evaluación
        if not user_id or not user_id:
            return Response({"error": "Se requieren un ID de usuario y un ID de evaluación válidos."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Obtener la instancia de evaluación asociada al usuario y al ID de evaluación
            eval_instance = Eval.objects.get(user_id=user_id)
            email= eval_instance.user_email
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
            eval_instance.paso= 2
        if nombre_sup:
            eval_instance.nombre_sup = nombre_sup
        if rut_sup:
            eval_instance.rut_sup = rut_sup
            eval_instance.profesor = teacher
        if estado:
            eval_instance.estado= estado
        # Guardar los cambios en la base de datos
        eval_instance.save()
        send_email(sup_email,'Nuevo alumno', f'El alumno {nombre_alumno} solicito hacer la pasantia en su empresa \n Para aceptar al alumno haga click aqui: \n http://127.0.0.1:8000/api2/update/{email}')
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

class PendientesListView(APIView):
    def get(self, request):
        # Filtra los usuarios por el nombre 'teacher'
        teachers = Eval.objects.filter(estado__iexact='Pendiente')

        if not teachers.exists():
            raise NotFound('No hay pendientes')

        # Serializa solo los nombres de los usuarios
        Pendientes_emails = [teacher.user_email for teacher in teachers]

        # Devuelve los nombres como JSON
        response_data = {'Pendientes': Pendientes_emails}

        # Imprime los nombres en la consola del servidor
        print("Mail de pendientes", json.dumps(response_data))

        return Response(response_data)
    
class ReunionListView(APIView):
    def get(self, request):
        # Filtra los usuarios por el nombre 'teacher'
        teachers = Eval.objects.filter(reunion__iexact='Pendiente')

        if not teachers.exists():
            raise NotFound('No hay pendientes')

        # Serializa solo los nombres de los usuarios
        Reunion_emails = [teacher.user_email for teacher in teachers]

        # Devuelve los nombres como JSON
        response_data = {'Pendientes': Reunion_emails}

        # Imprime los nombres en la consola del servidor
        print("Mail_de_pendientes", json.dumps(response_data))

        return Response(response_data)

class UpdateReunionStatus(APIView):
    def post(self, request):
        # Obtener los datos de la solicitud
        user_email = request.data.get('user_email')
        nuevo_estado = request.data.get('reunion')

        # Validar que se proporciona un email y un nuevo estado de la reunión
        if not user_email or not nuevo_estado:
            return Response({"error": "Se requieren un email y un nuevo estado de reunión válidos."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Obtener la instancia de evaluación asociada al correo electrónico proporcionado
            eval_instance = Eval.objects.get(user_email=user_email)
        except Eval.DoesNotExist:
            return Response({"error": "No se encontró ninguna evaluación asociada al correo electrónico proporcionado."}, status=status.HTTP_404_NOT_FOUND)

        # Actualizar el estado de la reunión
        eval_instance.reunion = nuevo_estado

        # Guardar los cambios en la base de datos
        eval_instance.save()

        # Serializar la instancia modificada y devolverla como respuesta
        serializer = OtherModelSerializer(eval_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
class UpdateEstadoStatus(APIView):
    def post(self, request):
        # Obtener los datos de la solicitud
        user_email = request.data.get('user_email')
        nuevo_estado = request.data.get('estado')

        # Validar que se proporciona un email y un nuevo estado de la reunión
        if not user_email or not nuevo_estado:
            return Response({"error": "Se requieren un email y un nuevo estado de reunión válidos."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Obtener la instancia de evaluación asociada al correo electrónico proporcionado
            eval_instance = Eval.objects.get(user_email=user_email)
        except Eval.DoesNotExist:
            return Response({"error": "No se encontró ninguna evaluación asociada al correo electrónico proporcionado."}, status=status.HTTP_404_NOT_FOUND)

        # Actualizar el estado de la reunión
        eval_instance.estado = nuevo_estado
        eval_instance.paso=4
        # Guardar los cambios en la base de datos
        eval_instance.save()

        # Serializar la instancia modificada y devolverla como respuesta
        serializer = OtherModelSerializer(eval_instance)
        send_email(user_email,'Actualizacion estado de Pasantia',f'Tu pasantia ha sido {nuevo_estado}')
        return Response(serializer.data, status=status.HTTP_200_OK)
class GetEvaluationDetails(APIView):
    def post(self, request):
        # Get the user_email from the request data
        user_email = request.data.get('user_email')
        
        # Validate that user_email is provided
        if not user_email:
            return Response({"error": "Se requiere un email de usuario válido."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Get the Eval instance associated with the provided user_email
            eval_instance = Eval.objects.get(user_email=user_email)
        except Eval.DoesNotExist:
            return Response({"error": "No se encontró ninguna evaluación asociada al correo electrónico proporcionado."}, status=status.HTTP_404_NOT_FOUND)

        # Extract the required fields
        response_data = {
            'fecha_ini': eval_instance.fecha_ini,
            'fecha_ter': eval_instance.fecha_ter,
            'nombre_emp': eval_instance.nombre_emp,
            'rut_emp': eval_instance.rut_emp,
            'sup_email': eval_instance.sup_email,
            'nombre_sup': eval_instance.nombre_sup,
            'rut_sup': eval_instance.rut_sup,
            'resumen': eval_instance.resumen,
        }

        # Return the data as a JSON response
        return Response(response_data, status=status.HTTP_200_OK)

class Evaluar(APIView):
    def post(self, request):
        user_mail = request.data.get('user_email')
        evaluacion = request.data.get('evaluacion')
        nota = request.data.get('nota')
        comentario = request.data.get('comentario')

        if not user_mail or not evaluacion or not nota or not comentario:
            return Response({'error': 'Todos los campos son requeridos.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            eval_instance = Eval.objects.get(user_email=user_mail)
        except :
            return Response({'error': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        if evaluacion == 'Evaluacion 1':
            eval_instance.nota1 = nota
            eval_instance.evaluacion1 = comentario
        elif evaluacion == 'Evaluacion 2':
            eval_instance.nota2 = nota
            eval_instance.evaluacion2 = comentario
        elif evaluacion == 'Evaluacion 3':
            eval_instance.nota3 = nota
            eval_instance.evaluacion3 = comentario
        else:
            return Response({'error': 'Evaluación no válida.'}, status=status.HTTP_400_BAD_REQUEST)

        eval_instance.save()
        send_email(user_mail, f'La {evaluacion} ha sido subida', f'Su nota correspondiente es {nota} y la retroalimentacion hecha por le profersor es: \n {comentario}')
        return Response(status=status.HTTP_200_OK)




def ciclo_envio(fechaini, fechater, emailsup):
    try:
        print(f"ciclo_envio recibido - fechaini: {fechaini}, fechater: {fechater}, emailsup: {emailsup}")
        
        # Convertir fechas de string a datetime
        fechaini = datetime.strptime(fechaini, '%Y-%m-%d')
        fechater = datetime.strptime(fechater, '%Y-%m-%d')
        
        date_range = pd.date_range(start=fechaini, end=fechater, freq='MS')
        for date in date_range:
            # Encontrar el último día hábil del mes
            ultimo_dia_habil = date + CustomBusinessMonthEnd(1)
            
            # Llamar a la función para programar el envío del correo electrónico
            programar_envio(emailsup, 'Formulario de evaluación', 
                            'Haz la evaluación acá:\n https://forms.gle/ct9U4rNqJSzSebmL8',
                            int(ultimo_dia_habil.year), int(ultimo_dia_habil.month), int(ultimo_dia_habil.day),
                            8, 0)
            pass
        pass
    except Exception as e:
        print(f"Error en ciclo_envio: {e}")
        raise e
def update_data(request, email):
    try:
        user_profile = get_object_or_404(Eval, user_email=email)
        user_profile.estadosup = "Aprobado"
        user_profile.paso=3
        user_profile.save()
        
        return HttpResponse('Alumno aceptado')
        
    except Exception as e:
        print(f"Excepción: {e}")
        return JsonResponse({'status': 'error', 'message': f'No se pudo actualizar el estado del usuario: {str(e)}'}, status=500)

def ciclo(request, email):
    try:
        user_profile = get_object_or_404(Eval, user_email=email)
        
        if user_profile:
            
            
            # Asegurarse de que las fechas sean cadenas de texto en formato '%Y-%m-%d'
            fechaini = user_profile.fecha_ini.strftime('%Y-%m-%d')
            fechater = user_profile.fecha_ter.strftime('%Y-%m-%d')
            emailsup = user_profile.sup_email
            
            if fechaini:
                print('se esta enviando')
            return ciclo_envio(fechaini, fechater, emailsup)

            
            

    except Exception as e:
        print(f"Excepción: {e}")
        return JsonResponse({'status': 'error', 'message': f'No se pudo actualizar el estado del usuario: {str(e)}'}, status=500)


#Paso 5 Incripcion proyecto (Tiene ue hacerce por resumen)
class ModifyResumen(APIView):
    def post(self, request):
        # Obtener los datos de la solicitud
        user_id = request.data.get('user_id')
        resumen = request.data.get('resumen')

        # Validar que se proporciona un ID de usuario y un ID de evaluación
        if not user_id or not user_id:
            return Response({"error": "Se requieren un ID de usuario y un ID de evaluación válidos."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Obtener la instancia de evaluación asociada al usuario y al ID de evaluación
            eval_instance = Eval.objects.get(user_id=user_id)
        except Eval.DoesNotExist:
            return Response({"error": "No se encontró ninguna evaluación asociada al usuario y al ID de evaluación proporcionados."}, status=status.HTTP_404_NOT_FOUND)

        # Actualizar los campos si se proporcionan nuevos valores
        if resumen:
            eval_instance.resumen = resumen
            eval_instance.paso=5
        # Guardar los cambios en la base de datos
        eval_instance.save()
        # Serializar la instancia modificada y devolverla como respuesta
        serializer = OtherModelSerializer(eval_instance)
        return Response(serializer.data)