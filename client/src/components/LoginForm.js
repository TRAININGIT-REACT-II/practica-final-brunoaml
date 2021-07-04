import {useState, useContext, useEffect} from "react";
import "./css/LoginForm.css";
import useApi from "../hooks/useApi";
import user from "../contexts/user";
import { useHistory} from "react-router";

const LoginForm = () => {   
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const userContext = useContext(user);
    const history = useHistory();
    const request = useApi("/api/login", "", {}, false);
    useEffect(() => {
        if (!request.loading && request.data != undefined) {
            if(request.data != undefined){
                console.log(request.data);
                userContext.update(request.data);
                history.push("/notes");
            }
        }
      }, [request.loading]);
    const login = (username,  password) => {
        request.updateParams({
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        request.perform();
    };
    const onClickRegister = () => {
        history.push("/register");
    }
    const onSubmit = (e) => {
        e.preventDefault();
        login(username, password);
    };
  return <form onSubmit={onSubmit}>
        <label htmlFor="loginForm-username">Nombre de usuario:</label>
        <input id="loginForm-username" type="text" onChange={(e) => setUsername(e.target.value)}/>
        <label htmlFor="loginForm-password">Contraseña:</label>
        <input id="loginForm-password" type="password" onChange={(e) => setPassword(e.target.value)}/>
        <button id="loginForm-submit" type="onSubmit">Aceptar</button>
        <button id="loginForm-register" onClick={onClickRegister}>Registrarse</button>
    </form>
};

export default LoginForm;