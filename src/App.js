import './App.css';
import { ListaClientesComponent } from './components/ListaClientesComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddClienteComponent from './components/AddClienteComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
      <HeaderComponent></HeaderComponent>
      <div className='container'>
        <Routes>
          <Route exact path="/" element={<ListaClientesComponent></ListaClientesComponent>}></Route>
          <Route path="/clientes" element={<ListaClientesComponent></ListaClientesComponent>}></Route>
          <Route path="/add-cliente" element={<AddClienteComponent></AddClienteComponent>}></Route>
          <Route path="/edit-cliente/:id" element={<AddClienteComponent></AddClienteComponent>}></Route>
        </Routes>
      </div>
      <FooterComponent></FooterComponent>
      </BrowserRouter>
    </div>
  );
}

export default App;
