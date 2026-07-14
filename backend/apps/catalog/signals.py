from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Product

@receiver(post_save, sender=Product)
def mi_signal(sender, instance, created, **kwargs):
    if created:
        print(f"Producto {instance.name} creado. Stock actual: {instance.stock}")
    else:
        print(f"Producto {instance.name} actualizado. Stock actual: {instance.stock}")
