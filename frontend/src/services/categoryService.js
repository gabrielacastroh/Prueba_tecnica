import api from '../api/axios';

export const obtenerCategoria = () => {
    return api.get("categories/");
};

export const crearCategoria = (data) => {
    return api.post("categories/", data);
};

export const eliminarCategoria = (id) => {
    return api.delete(`categories/${id}/`);
};

export const actualizarCategoria = (id, data) => {
    return api.put(`categories/${id}/`, data);
};
