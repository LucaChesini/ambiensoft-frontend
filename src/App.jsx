import { useState } from 'react'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './inicio/TelaInicial'
import ListagemZoonoses from './Zoonoses/Listagem'
import CriarRaiva from './Zoonoses/RaivaCriar'
import ShowRaiva from './Zoonoses/RaivaShow'
import EditarRaiva from './Zoonoses/RaivaEditar'

function App() {

  return (
    <>
      <Navbar/>
      <div className='container mx-auto p-4'>
        <Routes>
          <Route path='/' element={<About/>} />
          <Route path='/zoonoses' element={<ListagemZoonoses/>} />
          <Route path='/zoonoses/raiva/criar' element={<CriarRaiva/>} />
          <Route path="/zoonoses/raiva/:id" element={<ShowRaiva />} />
          <Route path="/zoonoses/raiva/:id/editar" element={<EditarRaiva />} />
        </Routes>
      </div>
    </>
  )
}

export default App
