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
import ListagemArboviroses from './Arboviroses/Listagem'
import CriarDengue from './Arboviroses/DengueCriar'
import CriarChikungunya from './Arboviroses/ChikungunyaCriar'
import ShowDengue from './Arboviroses/DengueShow'
import ShowChikungunya from './Arboviroses/ChikungunyaShow'
import EditarDengue from './Arboviroses/DengueEditar'
import EditarChikungunya from './Arboviroses/ChikungunyaEditar'
import TelaInicial from './inicio/TelaInicial'
import TelaInicialEnderecos from './Enderecos/TelaInicial'
import CriarBairro from './Enderecos/Bairro'
import CriarRua from './Enderecos/Rua'
import CriarEncontro from './Encontros/EncontroCriar'
import CriarDenuncia from './Denuncias/DenunciaCriar'

function App() {

  return (
    <>
      <Navbar/>
      <div className='container mx-auto p-4'>
        <Routes>
          <Route path='/' element={<TelaInicial/>} />
          <Route path='/zoonoses' element={<ListagemZoonoses/>} />
          <Route path='/zoonoses/raiva/criar' element={<CriarRaiva/>} />
          <Route path='/zoonoses/leptospirose/criar' element={<CriarLeptospirose/>} />
          <Route path="/zoonoses/raiva/:id" element={<ShowRaiva />} />
          <Route path="/zoonoses/leptospirose/:id" element={<ShowLeptospirose />} />
          <Route path="/zoonoses/raiva/:id/editar" element={<EditarRaiva />} />
          <Route path="/zoonoses/leptospirose/:id/editar" element={<EditarLeptospirose />} />
          <Route path='/arboviroses' element={<ListagemArboviroses/>} />
          <Route path='/arboviroses/dengue/criar' element={<CriarDengue/>} />
          <Route path='/arboviroses/chikungunya/criar' element={<CriarChikungunya/>} />
          <Route path="/arboviroses/dengue/:id" element={<ShowDengue />} />
          <Route path="/arboviroses/chikungunya/:id" element={<ShowChikungunya />} />
          <Route path="/arboviroses/dengue/:id/editar" element={<EditarDengue />} />
          <Route path="/arboviroses/chikungunya/:id/editar" element={<EditarChikungunya />} />
          <Route path="/enderecos" element={<TelaInicialEnderecos />} />
          <Route path="/enderecos/bairro/criar" element={<CriarBairro />} />
          <Route path="/enderecos/rua/criar" element={<CriarRua />} />
          <Route path="/encontros/criar" element={<CriarEncontro />} />
          <Route path="/denuncias/criar" element={<CriarDenuncia />} />
        </Routes>
      </div>
    </>
  )
}

export default App
