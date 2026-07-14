import React, { useEffect, useState } from "react";
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  obtenerProductos,
} from "../services/productService";
import { obtenerCategoria } from "../services/categoryService";
import "./catalog.css";

export const Product = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
  });
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  useEffect(() => {
    cargarProductos();
  }, [busqueda, categoriaFiltro]);

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarProductos = async () => {
    const response = await obtenerProductos({
      search: busqueda || undefined,
      category_id: categoriaFiltro || undefined,
    });
    setProductos(response.data);
  };

  const cargarCategorias = async () => {
    const response = await obtenerCategoria();
    setCategorias(response.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (productoEditar) {
        await actualizarProducto(productoEditar.id, form);
      } else {
        await crearProducto(form);
      }

      setProductoEditar(null);
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        category_id: "",
      });

      cargarProductos();
    } catch {
      setError("No se pudo guardar el producto.");
    }
  };

  const eliminar = async (id) => {
    setError("");

    try {
      await eliminarProducto(id);
      cargarProductos();
    } catch {
      setError("No se pudo eliminar el producto.");
    }
  };

  const editar = (producto) => {
    setProductoEditar(producto);
    setForm({
      name: producto.name,
      description: producto.description,
      price: producto.price,
      stock: producto.stock,
      category_id: producto.category?.id ?? "",
    });
  };

  const cancelarEdicion = () => {
    setProductoEditar(null);
    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      category_id: "",
    });
  };

  return (
    <main className="catalog-page">
      <h1>Gestión de Productos</h1>

      {error && <p className="catalog-error">{error}</p>}

      <section>
        <h2>{productoEditar ? "Editar Producto" : "Crear Producto"}</h2>

        <form className="catalog-form" onSubmit={guardarProducto}>
          <div className="catalog-field">
            <label>Nombre</label>
            <input name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className="catalog-field">
            <label>Descripción</label>
            <input name="description" value={form.description} onChange={handleChange} />
          </div>

          <div className="catalog-field">
            <label>Precio</label>
            <input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} />
          </div>

          <div className="catalog-field">
            <label>Stock</label>
            <input type="number" name="stock" value={form.stock} onChange={handleChange} />
          </div>

          <div className="catalog-field">
            <label>Categoria</label>
            <select name="category_id" value={form.category_id} onChange={handleChange}>
              <option value="">Seleccione una categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.name}
                </option>
              ))}
            </select>
          </div>

          <div className="catalog-form-actions">
            <button type="submit" className="btn">
              {productoEditar ? "Actualizar" : "Guardar"}
            </button>
            {productoEditar && (
              <button type="button" className="btn btn-secondary" onClick={cancelarEdicion}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section>
        <h2>Listado de Productos</h2>

        <div className="catalog-filters">
          <input
            placeholder="Buscar por nombre"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)}>
            <option value="">Todas las categorias</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.name}
              </option>
            ))}
          </select>
        </div>

        <table className="catalog-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoria</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.name}</td>
                <td>{producto.price}</td>
                <td>{producto.stock}</td>
                <td>{producto.category?.name}</td>

                <td>
                  <button className="btn btn-secondary" onClick={() => editar(producto)}>
                    Editar
                  </button>{" "}
                  <button className="btn btn-danger" onClick={() => eliminar(producto.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};
