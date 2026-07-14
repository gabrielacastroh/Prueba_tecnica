from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.decorators import action

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    queryset = Product.objects.all()

    filterset_fields = ["category_id"]
    search_fields = ["name"]

    def get_queryset(self):
        return Product.objects.filter(is_active=True).select_related("category")

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

    @action(detail=True, methods=["post"])
    def adjust_stock(self, request, pk=None):
        product = self.get_object()

        try:
            quantity = int(request.data.get("quantity"))
        except (TypeError, ValueError):
            return Response(
                {"detail": "quantity debe ser un entero."},
                status=status.HTTP_400_BAD_REQUEST
            )

        new_stock = product.stock + quantity

        if new_stock < 0:
            return Response(
                {"detail": "El stock no puede quedar negativo."},
                status=status.HTTP_400_BAD_REQUEST
            )

        product.stock = new_stock
        product.save()

        return Response(
            {
                "message": "Stock actualizado correctamente.",
                "stock": product.stock
            }
        )

