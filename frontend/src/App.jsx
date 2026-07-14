import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Category } from "./pages/category";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Category />} />
        {/* <Route path="/libros" element={<Libros />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
