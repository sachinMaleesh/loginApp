import React,{useState} from 'react';

import Login from './componentes/Login';
import Menu from './componentes/Menu';

function App() {

  const [conectado,setConectado]=useState(false);

  const acceder=(estado)=>{
    setConectado(estado)

  }

  return (
    conectado ?<Menu/>:<Login acceder={acceder}/>
    
     
  );
}

export default App;
