from django.db.models.signals import post_save
from django.dispatch import receiver
from users.models import User
from .models import Eval

@receiver(post_save, sender=User)
def sync_user_info(sender, instance, created, **kwargs):
    if created:
        # Si el usuario es nuevo, crea una entrada en Eval
        Eval.objects.create(user_id=instance.id, user_email=instance.email, user_role=instance.role)
    else:
        # Si el usuario ya existe, actualiza las entradas existentes en Eval
        Eval.objects.filter(user_id=instance.id).update(user_email=instance.email)
