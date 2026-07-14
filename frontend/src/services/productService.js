import api from "../api/axios";

export const obtenerProductos = (params) => {
  return api.get("products/", { params });
};

export const obtenerProducto = (id) => {
  return api.get(`products/${id}/`);
};

export const crearProducto = (data) => {
  return api.post("products/", data);
};

export const actualizarProducto = (id, data) => {
  return api.put(`products/${id}/`, data);
};

export const actualizarProductoParcial = (id, data) => {
  return api.patch(`products/${id}/`, data);
};

export const eliminarProducto = (id) => {
  return api.delete(`products/${id}/`);
};
