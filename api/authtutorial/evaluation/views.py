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
from datetime import datetime
from pandas.tseries.offsets import CustomBusinessMonthEnd
from rest_framework.parsers import MultiPartParser, FormParser
import os
from django.db.models import Count
from rest_framework.decorators import api_view
from django.db.models import Q
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
    admins=User.objects.filter(role='admin')
    # Obtener los correos electrónicos de estos usuarios
    teacher_emails = teachers.values_list('email', flat=True)
    admin_mails=admins.values_list('email', flat=True)
    # Obtener los registros de Eval asociados con los usuarios 'teacher'
    evals_to_delete = Eval.objects.filter(user_email__in=teacher_emails)
    evals_to_delete2 = Eval.objects.filter(user_email__in=admin_mails)
    # Eliminar los registros de Eval asociados con los usuarios 'teacher'
    evals_to_delete.delete()
    evals_to_delete2.delete()

    return HttpResponse("Registros de usuarios con el rol 'teacher' eliminados de Eval.")

class PendientesListView(APIView):
    def get(self, request):
        # Filtra los usuarios por el estado 'Pendiente'
        teachers_pendientes = Eval.objects.filter(estado__iexact='Pendiente')

        # Filtra los usuarios por requisitos 'Aprobados'
        teachers_aprobados = teachers_pendientes.filter(requisitos__iexact='Aprobado')

        if not teachers_aprobados.exists():
            raise NotFound('No hay pendientes con requisitos Aprobados')

        # Serializa solo los correos electrónicos de los usuarios
        Pendientes_emails = [teacher.user_email for teacher in teachers_aprobados]

        # Devuelve los correos electrónicos como JSON
        response_data = {'Pendientes': Pendientes_emails}

        # Imprime los correos electrónicos en la consola del servidor
        print("Mail de pendientes con requisitos Aprobados", json.dumps(response_data))

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
            'rut_sup': eval_instance.rut_sup
        }

        # Return the data as a JSON response
        return Response(response_data, status=status.HTTP_200_OK)

class Evaluar(APIView):
    def post(self, request):
        user_email = request.data.get('user_email')
        evaluacion = request.data.get('evaluacion')
        nota= request.data.get('nota')
        comentario= request.data.get('comentario')
  # Ajustado para coincidir con el nombre del campo

        if not user_email or not evaluacion :
            return Response({'error': 'Todos los campos son requeridos.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            eval_instance = Eval.objects.get(user_email=user_email)
            if eval_instance:
                print('se encontro')
                if evaluacion == 'Evaluación 1':
                    eval_instance.nota1=nota
                    eval_instance.evaluacion1=comentario
                    uploaded_file = request.data.get('file')
                    if uploaded_file:
                        # Define el directorio de uploads (asegúrate de que exista)
                        upload_dir = 'upload/'
                        if not os.path.exists(upload_dir):
                            os.makedirs(upload_dir)
                        
                        # Construir la ruta completa del archivo
                        file_path = os.path.join(upload_dir, uploaded_file.name)
                        
                        # Guardar el archivo en el servidor
                        with open(file_path, 'wb') as file_object:
                            for chunk in uploaded_file.chunks():
                                file_object.write(chunk)
                        
                        # Actualizar el campo 'resumen' en el objeto Eval
                        eval_instance.rubrica1 = file_path
                        eval_instance.save()
                elif evaluacion == 'Evaluación 2':
                    eval_instance.nota2=nota
                    eval_instance.evaluacion2=comentario
                    uploaded_file = request.data.get('file')
                    if uploaded_file:
                        # Define el directorio de uploads (asegúrate de que exista)
                        upload_dir = 'upload/'
                        if not os.path.exists(upload_dir):
                            os.makedirs(upload_dir)
                        
                        # Construir la ruta completa del archivo
                        file_path = os.path.join(upload_dir, uploaded_file.name)
                        
                        # Guardar el archivo en el servidor
                        with open(file_path, 'wb') as file_object:
                            for chunk in uploaded_file.chunks():
                                file_object.write(chunk)
                        
                        # Actualizar el campo 'resumen' en el objeto Eval
                        eval_instance.rubrica2 = file_path
                        eval_instance.save()

                elif evaluacion == 'Evaluación 3':
                    eval_instance.nota3=nota
                    eval_instance.evaluacion3=comentario
                    uploaded_file = request.data.get('file')
                    if uploaded_file:
                        # Define el directorio de uploads (asegúrate de que exista)
                        upload_dir = 'upload/'
                        if not os.path.exists(upload_dir):
                            os.makedirs(upload_dir)
                        
                        # Construir la ruta completa del archivo
                        file_path = os.path.join(upload_dir, uploaded_file.name)
                        
                        # Guardar el archivo en el servidor
                        with open(file_path, 'wb') as file_object:
                            for chunk in uploaded_file.chunks():
                                file_object.write(chunk)
                        
                        # Actualizar el campo 'resumen' en el objeto Eval
                        eval_instance.rubrica3 = file_path
                        eval_instance.save()
                eval_instance.save()
            else:
                return Response({'error': 'Evaluación no válida.'}, status=status.HTTP_400_BAD_REQUEST)
        except Eval.DoesNotExist:
            return Response({'error': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        # Asignación de nota y comentario según la evaluación seleccionada
        

       

        # Envío de correo electrónico
        send_email(user_email, f'La {evaluacion} ha sido subida', f'Su rubrica ha sido subida')

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
    



class FileUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        
        try:
            eval_instance = Eval.objects.get(user_id=user_id)
        except Eval.DoesNotExist:
            return Response({"error": "Eval instance not found for this user"}, status=404)
        
        # Obtener el archivo subido
        uploaded_file = request.data.get('file')
        
        # Guardar el archivo en un directorio de uploads
        if uploaded_file:
            # Define el directorio de uploads (asegúrate de que exista)
            upload_dir = 'upload/'
            if not os.path.exists(upload_dir):
                os.makedirs(upload_dir)
            
            # Construir la ruta completa del archivo
            file_path = os.path.join(upload_dir, uploaded_file.name)
            
            # Guardar el archivo en el servidor
            with open(file_path, 'wb') as file_object:
                for chunk in uploaded_file.chunks():
                    file_object.write(chunk)
            
            # Actualizar el campo 'resumen' en el objeto Eval
            eval_instance.resumen = file_path
            eval_instance.save()
            
            # Crear un serializer específico para Eval
            serializer = OtherModelSerializer(eval_instance)
            
            return Response(serializer.data, status=201)
        
        return Response({"error": "No file uploaded"}, status=400)


class DocumentDownloadView1(APIView):
    
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            user_id = data.get('user_id')
            eval_instance = get_object_or_404(Eval, user_id=user_id)
            document_filename = eval_instance.rubrica1  # Obtén el nombre del archivo desde el modelo
            
            # Define la ruta completa al archivo basado en la ruta relativa almacenada en el modelo
            base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
            document_path = os.path.join(base_path, document_filename)
            
            print(f"Ruta completa al archivo: {document_path}")  # Imprime la ruta para depurar
            
            if os.path.exists(document_path):
                with open(document_path, 'rb') as document:
                    response = HttpResponse(document.read(), content_type='application/pdf')
                    response['Content-Disposition'] = f'attachment; filename="{os.path.basename(document_path)}"'
                    return response
            else:
                return HttpResponse("Documento no encontrado en la ruta especificada", status=404)
        
        except Eval.DoesNotExist:
            return HttpResponse("No se encontró la instancia de Eval para este user_id", status=404)
        
        except json.JSONDecodeError:
            return HttpResponse("Datos no válidos en la solicitud JSON", status=400)
        
        except OSError as e:
            print(f"Error al abrir el archivo: {str(e)}")
            return HttpResponse(f"Error al abrir el archivo: {str(e)}", status=500)
        
        except Exception as e:
            return HttpResponse(f"Error inesperado al procesar la solicitud: {str(e)}", status=500)

class DocumentDownloadView2(APIView):
    
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            user_id = data.get('user_id')
            eval_instance = get_object_or_404(Eval, user_id=user_id)
            document_filename = eval_instance.rubrica2  # Obtén el nombre del archivo desde el modelo
            
            # Define la ruta completa al archivo basado en la ruta relativa almacenada en el modelo
            base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
            document_path = os.path.join(base_path, document_filename)
            
            print(f"Ruta completa al archivo: {document_path}")  # Imprime la ruta para depurar
            
            if os.path.exists(document_path):
                with open(document_path, 'rb') as document:
                    response = HttpResponse(document.read(), content_type='application/pdf')
                    response['Content-Disposition'] = f'attachment; filename="{os.path.basename(document_path)}"'
                    return response
            else:
                return HttpResponse("Documento no encontrado en la ruta especificada", status=404)
        
        except Eval.DoesNotExist:
            return HttpResponse("No se encontró la instancia de Eval para este user_id", status=404)
        
        except json.JSONDecodeError:
            return HttpResponse("Datos no válidos en la solicitud JSON", status=400)
        
        except OSError as e:
            print(f"Error al abrir el archivo: {str(e)}")
            return HttpResponse(f"Error al abrir el archivo: {str(e)}", status=500)
        
        except Exception as e:
            return HttpResponse(f"Error inesperado al procesar la solicitud: {str(e)}", status=500)
class DocumentDownloadView3(APIView):
    
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            user_id = data.get('user_id')
            eval_instance = get_object_or_404(Eval, user_id=user_id)
            document_filename = eval_instance.rubrica3  # Obtén el nombre del archivo desde el modelo
            
            # Define la ruta completa al archivo basado en la ruta relativa almacenada en el modelo
            base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
            document_path = os.path.join(base_path, document_filename)
            
            print(f"Ruta completa al archivo: {document_path}")  # Imprime la ruta para depurar
            
            if os.path.exists(document_path):
                with open(document_path, 'rb') as document:
                    response = HttpResponse(document.read(), content_type='application/pdf')
                    response['Content-Disposition'] = f'attachment; filename="{os.path.basename(document_path)}"'
                    return response
            else:
                return HttpResponse("Documento no encontrado en la ruta especificada", status=404)
        
        except Eval.DoesNotExist:
            return HttpResponse("No se encontró la instancia de Eval para este user_id", status=404)
        
        except json.JSONDecodeError:
            return HttpResponse("Datos no válidos en la solicitud JSON", status=400)
        
        except OSError as e:
            print(f"Error al abrir el archivo: {str(e)}")
            return HttpResponse(f"Error al abrir el archivo: {str(e)}", status=500)
        
        except Exception as e:
            return HttpResponse(f"Error inesperado al procesar la solicitud: {str(e)}", status=500)

class Notas1(APIView):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            user_id = data.get('user_id')
            
            if not user_id:
                return JsonResponse({'error': 'No se proporcionó user_id en la solicitud'}, status=400)
            
            eval_instance = get_object_or_404(Eval, user_id=user_id)

            data = {
                'evaluacion1': eval_instance.evaluacion1,
                'nota1': eval_instance.nota1,
            }
            print(data)
            return Response(data)
        
        except Eval.DoesNotExist:
            return JsonResponse({'error': 'No se encontró la instancia de Eval para este user_id'}, status=404)
        
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Datos no válidos en la solicitud JSON'}, status=400)
        
        except Exception as e:
            return JsonResponse({'error': f'Error al procesar la solicitud: {str(e)}'}, status=500)

class Notas2(APIView):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            user_id = data.get('user_id')
            
            if not user_id:
                return JsonResponse({'error': 'No se proporcionó user_id en la solicitud'}, status=400)
            
            eval_instance = get_object_or_404(Eval, user_id=user_id)

            data = {
                'evaluacion2': eval_instance.evaluacion2,
                'nota2': eval_instance.nota2,
            }
            print(data)
            return Response(data)
        
        except Eval.DoesNotExist:
            return JsonResponse({'error': 'No se encontró la instancia de Eval para este user_id'}, status=404)
        
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Datos no válidos en la solicitud JSON'}, status=400)
        
        except Exception as e:
            return JsonResponse({'error': f'Error al procesar la solicitud: {str(e)}'}, status=500)
class Notas3(APIView):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            user_id = data.get('user_id')
            
            if not user_id:
                return JsonResponse({'error': 'No se proporcionó user_id en la solicitud'}, status=400)
            
            eval_instance = get_object_or_404(Eval, user_id=user_id)

            data = {
                'evaluacion3': eval_instance.evaluacion3,
                'nota3': eval_instance.nota3,
            }
            print(data)
            return Response(data)
        
        except Eval.DoesNotExist:
            return JsonResponse({'error': 'No se encontró la instancia de Eval para este user_id'}, status=404)
        
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Datos no válidos en la solicitud JSON'}, status=400)
        
        except Exception as e:
            return JsonResponse({'error': f'Error al procesar la solicitud: {str(e)}'}, status=500)
class GetUserEmailsByTeacher(APIView):
    def post(self, request):
        # Obtener el 'user' enviado en la solicitud POST
        user = request.data.get('user_teacher')

        if not user:
            return Response({"error": "Se requiere proporcionar un 'user' en la solicitud POST."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Filtrar las instancias de Eval donde 'profesor' coincide con el 'user' proporcionado
            evals = Eval.objects.filter(profesor=user).values_list('user_email', flat=True)

            # Convertir los resultados en una lista plana de user_email
            user_emails = list(evals)

            # Devolver los user_emails como respuesta JSON
            return Response({"user_emails": user_emails}, status=status.HTTP_200_OK)

        except Eval.DoesNotExist:
            return Response({"error": f"No se encontraron instancias de Eval donde 'profesor' sea '{user}'."}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": f"Error al procesar la solicitud: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def count_users_by_step(request):
    try:
        # Query to count users per step using Django ORM
        steps_count = Eval.objects.values('paso').annotate(total_users=Count('id')).order_by('paso')
        
        # 'paso' should be the field where you store the step for each user
        # Creating a list of dictionaries with 'step' and 'total_users' keys
        data = [{'step': step['paso'], 'total_users': step['total_users']} for step in steps_count]
        
        # Returning the data as a JSON response with HTTP status 200 OK
        return Response(data, status=status.HTTP_200_OK)
    
    except Exception as e:
        # Handling exceptions and returning a JSON response with HTTP status 500 Internal Server Error
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class EvaluarEmp(APIView):
    def post(self, request):
        user_email = request.data.get('user_email')
        nota = request.data.get('nota')

        if not user_email or nota is None:
            return Response({'error': 'Todos los campos son requeridos.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            eval_instance = Eval.objects.get(user_email=user_email)
            
            if eval_instance:
                print('se encontró')
                personas = eval_instance.personas + 1
                nota_promedio = (eval_instance.notapemp * eval_instance.personas + nota) / personas
                eval_instance.personas = personas
                eval_instance.notapemp = nota_promedio
                eval_instance.save()
            else:
                return Response({'error': 'Evaluación no válida.'}, status=status.HTTP_400_BAD_REQUEST)
        except Eval.DoesNotExist:
            return Response({'error': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_200_OK)
    
class ObtenerEvaluacionPas(APIView):
    def post(self, request):
        user_email = request.data.get('user_email')

        if not user_email:
            return Response({'error': 'El campo user_email es requerido.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            eval_instance = Eval.objects.get(user_email=user_email)
            data = {
                'personas': eval_instance.personas,
                'notapemp': eval_instance.notapemp
            }
            return Response(data, status=status.HTTP_200_OK)
        except Eval.DoesNotExist:
            return Response({'error': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
class PendientesListViewRequ(APIView):
    def get(self, request):
        # Filtra los usuarios por el nombre 'teacher'
        teachers = Eval.objects.filter(requisitos__iexact='Pendiente')

        if not teachers.exists():
            raise NotFound('No hay pendientes')

        # Serializa solo los nombres de los usuarios
        Pendientes_emails = [teacher.user_email for teacher in teachers]

        # Devuelve los nombres como JSON
        response_data = {'Pendientes': Pendientes_emails}

        # Imprime los nombres en la consola del servidor
        print("Mail de pendientes", json.dumps(response_data))

        return Response(response_data)

class UpdateReq(APIView):
    def post(self, request):
        # Obtener los datos de la solicitud
        user_email = request.data.get('user_email')
        nuevo_estado = request.data.get('requisitos')

        # Validar que se proporciona un email y un nuevo estado de la reunión
        if not user_email or not nuevo_estado:
            return Response({"error": "Se requieren un email y un nuevo estado de reunión válidos."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Obtener la instancia de evaluación asociada al correo electrónico proporcionado
            eval_instance = Eval.objects.get(user_email=user_email)
        except Eval.DoesNotExist:
            return Response({"error": "No se encontró ninguna evaluación asociada al correo electrónico proporcionado."}, status=status.HTTP_404_NOT_FOUND)

        # Actualizar el estado de la reunión
        eval_instance.requisitos = nuevo_estado

        # Guardar los cambios en la base de datos
        eval_instance.save()

        # Serializar la instancia modificada y devolverla como respuesta
        serializer = OtherModelSerializer(eval_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)