import React,{useRef, useState} from "react";
import "../css/login.css";
const URL_LOGIN="http://localhost/reactPHP/login.php";

const enviarData=async(url,data)=>{
    const resp=await fetch(url,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-type':'application/json'
        }
    });

    //console.log(resp);
    const json=await resp.json();
    //console.log(json);

    return json;
}

export default function Login(props) {

    const [error,setError]=useState(null);
    const[espera,setEspera]=useState(false);

    const refUsuario=useRef(null);
    const refClave=useRef(null);
    const handleLogin=async()=>{
        setEspera(true);

        const data={
            "usuario":refUsuario.current.value,
            "clave":refClave.current.value
        };

        console.log(data);
        const respuestajson=await enviarData(URL_LOGIN,data);
        console.log("respueseta desde el evento",respuestajson);
        //console.log("sucess",resp);
        
        props.acceder(respuestajson.conectado)
        setError(respuestajson.error)
        setEspera(false);

    }


  return (
    <div className="login">
      <div className="raw">
        <div className="col-sm-4 offset-4 mt-5">
          <div className="card">
            <div className="card-header"><h1>LogIn</h1></div>
            <div className="card-body">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  @
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="email"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  ref={refUsuario}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  @
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  aria-label="clave"
                  aria-describedby="basic-addon2"
                  ref={refClave}
                />
              </div>
              {
                error && 
                <div className="alert alert-danger">
                {error}
                </div>
              }
              <button onClick={handleLogin} 
              disabled={espera}
              className="btn btn-danger btn-lg">Login</button>
              <div className="card-footer">
                  <span>forget password?</span><a href="http://">help</a>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
