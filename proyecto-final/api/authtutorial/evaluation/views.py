from django.http import JsonResponse
from .models import Eval
import json

def update_estado(request):
    # Obtener el correo electrónico del usuario del cuerpo de la solicitud
    user_email = request.POST.get('email')

    if not user_email:
        return JsonResponse({'message': 'No se proporcionó el correo electrónico del usuario'}, status=400)

    # Filtrar la instancia de Eval asociada al usuario por su correo electrónico
    try:
        eval_instance = Eval.objects.get(email=user_email)
    except Eval.DoesNotExist:
        return JsonResponse({'message': 'El usuario no tiene una instancia de Eval'}, status=404)

    # Obtener el nuevo valor de estado del cuerpo de la solicitud
    new_estado = request.POST.get('estado')

    if new_estado is None:
        return JsonResponse({'message': 'No se proporcionó el nuevo valor de estado'}, status=400)

    # Actualizar la instancia con el nuevo valor de estado
    eval_instance.estado = new_estado
    eval_instance.save()

    # Retornar una respuesta JSON indicando que la actualización fue exitosa
    return JsonResponse({'message': 'Estado actualizado correctamente'}, status=200)

def update_evaluacion(request):
    # Obtener el correo electrónico del usuario del cuerpo de la solicitud
    user_email = request.POST.get('user_email')

    if not user_email:
        return JsonResponse({'message': 'No se proporcionó el correo electrónico del usuario'}, status=400)

    # Filtrar la instancia de Eval asociada al usuario por su correo electrónico
    try:
        eval_instance = Eval.objects.get(email=user_email)
    except Eval.DoesNotExist:
        return JsonResponse({'message': 'El usuario no tiene una instancia de Eval'}, status=404)

    # Obtener el nuevo valor de evaluacion del cuerpo de la solicitud
    new_evaluacion = request.POST.get('evaluacion')

    if new_evaluacion is None:
        return JsonResponse({'message': 'No se proporcionó la nueva evaluación'}, status=400)

    # Actualizar la instancia con el nuevo valor de evaluacion
    eval_instance.evaluacion = new_evaluacion
    eval_instance.save()

    # Retornar una respuesta JSON indicando que la actualización fue exitosa
    return JsonResponse({'message': 'Evaluación actualizada correctamente'}, status=200)

def update_comentarios(request):
    # Obtener el correo electrónico del usuario del cuerpo de la solicitud
    user_email = request.POST.get('email')

    if not user_email:
        return JsonResponse({'message': 'No se proporcionó el correo electrónico del usuario'}, status=400)

    # Filtrar la instancia de Eval asociada al usuario por su correo electrónico
    try:
        eval_instance = Eval.objects.get(email=user_email)
    except Eval.DoesNotExist:
        return JsonResponse({'message': 'El usuario no tiene una instancia de Eval'}, status=404)

    # Obtener el nuevo valor de comentarios del cuerpo de la solicitud
    new_comentarios = request.POST.get('comentarios')

    if new_comentarios is None:
        return JsonResponse({'message': 'No se proporcionaron los nuevos comentarios'}, status=400)

    # Actualizar la instancia de Eval con el nuevo valor de comentarios
    eval_instance.comentarios = new_comentarios
    eval_instance.save()

    # Retornar una respuesta JSON indicando que la actualización fue exitosa
    return JsonResponse({'message': 'Comentarios actualizados correctamente'}, status=200)

def view_columns(request):
    # Obtener el correo electrónico del usuario de las cookies
    user_email = request.COOKIES.get('user_email')

    if not user_email:
        return JsonResponse({'message': 'No se pudo obtener el correo electrónico del usuario'}, status=400)

    # Filtrar todas las instancias de Eval asociadas al usuario por su correo electrónico
    eval_instances = Eval.objects.filter(email=user_email)

    if not eval_instances:
        return JsonResponse({'message': 'No se encontraron instancias asociadas al usuario'}, status=404)

    # Construir una respuesta JSON con las columnas encontradas
    columns_data = []
    for eval_instance in eval_instances:
        columns_data.append({
            'evaluacion': eval_instance.evaluacion,
            'comentarios': eval_instance.comentarios,
            # Añade aquí más columnas si es necesario
        })

    return JsonResponse({'columns': columns_data}, status=200)
def update_pasantias(request):
    # Obtener el ID del usuario de la cookie
    user_id = request.COOKIES.get('user_id')

    if not user_id:
        return JsonResponse({'message': 'No se pudo obtener el ID de usuario de la cookie'}, status=400)

    # Filtrar la instancia de Eval asociada al usuario por su ID
    try:
        eval_instance = Eval.objects.get(user_id=user_id)
    except Eval.DoesNotExist:
        return JsonResponse({'message': 'El usuario no tiene una instancia de Eval'}, status=404)

    # Obtener el nuevo valor de pasantia del cuerpo de la solicitud
    request_data = json.loads(request.body)
    new_pasantia = request_data.get('pasantia')

    if new_pasantia is None:
        return JsonResponse({'message': 'No se proporcionó el nuevo valor de pasantia'}, status=400)

    # Actualizar la instancia con el nuevo valor de pasantia
    eval_instance.pasantia = new_pasantia
    eval_instance.save()

    # Retornar una respuesta JSON indicando que la actualización fue exitosa
    return JsonResponse({'message': 'Pasantia actualizada correctamente'}, status=200)
def get_column_value(request):
    # Obtener el ID de la solicitud del cuerpo de la solicitud
    request_data = json.loads(request.body)
    id = request_data.get('id')

    if not id:
        return JsonResponse({'message': 'No se proporcionó el ID'}, status=400)

    # Filtrar la instancia de Eval asociada al ID
    try:
        eval_instance = Eval.objects.get(id=id)
    except Eval.DoesNotExist:
        return JsonResponse({'message': 'No se encontró una instancia de Eval con el ID especificado'}, status=404)

    # Obtener el nombre de la columna de la solicitud
    column_name = request_data.get('columna')

    if not column_name:
        return JsonResponse({'message': 'No se proporcionó el nombre de la columna'}, status=400)

    # Validar el nombre de la columna
    valid_columns = ['evaluacion', 'comentarios', 'pasantia','estado']
    if column_name not in valid_columns:
        return JsonResponse({'message': 'El nombre de la columna proporcionado no es válido'}, status=400)

    # Obtener el valor de la columna especificada
    column_value = getattr(eval_instance, column_name)

    # Retornar una respuesta JSON con el valor de la columna
    return JsonResponse({'valor': column_value}, status=200)
