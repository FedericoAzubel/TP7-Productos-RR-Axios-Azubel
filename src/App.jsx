import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from './pages/Home'
import Productos from "./pages/Productos";

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
            <Route path='/home' element={<Home/>}/>
            <Route path='/productos' element={<Productos/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
