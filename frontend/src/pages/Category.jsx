import React, { useEffect, useState } from "react";
import {
  actualizarLibro,
  crearLibro,
  eliminarLibro,
  obtenerLibros,
} from "../services/libroService";
import { obtenerAutor } from "../services/autorService";
import { crearCategoria, obtenerCategoria } from "../services/categoryService";

export const category = () => {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    name: "",
  });

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

    // if (libroEditar) {
    //   await actualizarLibro(libroEditar.id, form);
    // } else {
      await crearCategoria(form);
    // }

    setForm({
      name: "",
    });

    cargarCategorias();
  };

  // const eliminar = async (id) => {
  //   await eliminarLibro(id);
  //   cargarLibros();
  // };

  // const editar = async (data) => {
  //   setLibroEditar(data);
  //   setForm({
  //     titulo: data.titulo,
  //     descripcion: data.descripcion,
  //     autor: data.autor,
  //   });
  // };

  return (
    <main>
      <h1>Gestión de Categorias</h1>

      <section>
        <h2>Crear Categorias</h2>

        <form onSubmit={guardarCategoria}>
          <div>
            <label>Nombre de categoria</label>
            <br />

            <input name="name" value={form.name} onChange={handleChange} />
          </div>

          <br />

          {/* <button type="submit">{"Guardar"}</button> */}
          <button type="submit">{"Guardar"}</button>
        </form>
      </section>

      <hr />

      <section>
        <h2>Listado de Categorias</h2>

        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>

          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.name}</td>

                <td>
                  {/* <button onClick={() => editar(libro)}>Editar</button>{" "} */}
                  {/* <button onClick={() => eliminar(libro.id)}>Eliminar</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};
