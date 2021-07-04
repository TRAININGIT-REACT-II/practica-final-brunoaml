import {useState, useContext, useEffect} from "react";
import "./css/RegisterForm.css";
import useApi from "../hooks/useApi";
import user from "../contexts/user";
import { useHistory} from "react-router";

const RegisterForm = () => {   
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const userContext = useContext(user);
    const history = useHistory();
    const request = useApi("/api/register", "", {}, false);
    useEffect(() => {
        if (!request.loading && request.data != undefined) {
            console.log(request.data);
            userContext.update(request.data);
            history.push("/notes");
        }
      }, [request.loading]);
    const register = (username,  password) => {
        request.updateParams({
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        request.perform();
    };
    const onSubmit = (e) => {
        e.preventDefault();
        register(username, password);
    };
    
    const onClickLogin = () => {
        history.push("/login");
    }
  return <form onSubmit={onSubmit}>
        <label htmlFor="registerForm-username">Nombre de usuario:</label>
        <input id="registerForm-username" type="text" onChange={(e) => setUsername(e.target.value)}/>
        <label htmlFor="registerForm-password">Contraseña:</label>
        <input id="registerForm-password" type="password" onChange={(e) => setPassword(e.target.value)}/>
        <button id="registerForm-submit" type="onSubmit">Aceptar</button>
        <button id="loginForm-register" onClick={onClickLogin}>Iniciar sesión</button>
    </form>
};

export default RegisterForm;