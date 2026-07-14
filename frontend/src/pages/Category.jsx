import React, { useEffect, useState } from "react";
import {
  actualizarCategoria,
  crearCategoria,
  obtenerCategoria,
} from "../services/categoryService";
import "./catalog.css";

export const Category = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaEditar, setCategoriaEditar] = useState(null);
  const [form, setForm] = useState({
    name: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    cargarCategorias();
  }, []);

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

  const guardarCategoria = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (categoriaEditar) {
        await actualizarCategoria(categoriaEditar.id, form);
      } else {
        await crearCategoria(form);
      }

      setCategoriaEditar(null);
      setForm({
        name: "",
      });

      cargarCategorias();
    } catch {
      setError("No se pudo guardar la categoria.");
    }
  };

  const editar = (categoria) => {
    setCategoriaEditar(categoria);
    setForm({
      name: categoria.name,
    });
  };

  const cancelarEdicion = () => {
    setCategoriaEditar(null);
    setForm({ name: "" });
  };

  return (
    <main className="catalog-page">
      <h1>Gestión de Categorias</h1>

      {error && <p className="catalog-error">{error}</p>}

      <section>
        <h2>{categoriaEditar ? "Editar Categoria" : "Crear Categoria"}</h2>

        <form className="catalog-form" onSubmit={guardarCategoria}>
          <div className="catalog-field">
            <label>Nombre de categoria</label>
            <input name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className="catalog-form-actions">
            <button type="submit" className="btn">
              {categoriaEditar ? "Actualizar" : "Guardar"}
            </button>
            {categoriaEditar && (
              <button type="button" className="btn btn-secondary" onClick={cancelarEdicion}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section>
        <h2>Listado de Categorias</h2>

        <table className="catalog-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.name}</td>

                <td>
                  <button className="btn btn-secondary" onClick={() => editar(categoria)}>
                    Editar
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
