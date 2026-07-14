import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Category } from "./pages/Category";
import { Product } from "./pages/Product";

function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <NavLink to="/" end>
          Productos
        </NavLink>
        <NavLink to="/categorias">Categorias</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/categorias" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
