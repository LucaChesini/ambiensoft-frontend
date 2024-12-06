import { useState } from 'react'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './inicio/TelaInicial'
import ListagemZoonoses from './Zoonoses/Listagem'
import CriarRaiva from './Zoonoses/RaivaCriar'
import ShowRaiva from './Zoonoses/RaivaShow'
import EditarRaiva from './Zoonoses/RaivaEditar'
import CriarLeptospirose from './Zoonoses/LeptospiroseCriar'
import ShowLeptospirose from './Zoonoses/LeptospiroseShow'
import EditarLeptospirose from './Zoonoses/LeptospiroseEditar'

function App() {

  return (
    <>
      <Navbar/>
      <div className='container mx-auto p-4'>
        <Routes>
          <Route path='/' element={<About/>} />
          <Route path='/zoonoses' element={<ListagemZoonoses/>} />
          <Route path='/zoonoses/raiva/criar' element={<CriarRaiva/>} />
          <Route path='/zoonoses/leptospirose/criar' element={<CriarLeptospirose/>} />
          <Route path="/zoonoses/raiva/:id" element={<ShowRaiva />} />
          <Route path="/zoonoses/leptospirose/:id" element={<ShowLeptospirose />} />
          <Route path="/zoonoses/raiva/:id/editar" element={<EditarRaiva />} />
          <Route path="/zoonoses/leptospirose/:id/editar" element={<EditarLeptospirose />} />
        </Routes>
      </div>
    </>
  )
}

export default App
