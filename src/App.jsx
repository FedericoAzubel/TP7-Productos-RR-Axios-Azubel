import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from './pages/Home'
import Productos from "./pages/Productos";
import Producto from "./pages/DetalleProducto";

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path='/home' element={<Home />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/producto/:id' element={<Producto />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
