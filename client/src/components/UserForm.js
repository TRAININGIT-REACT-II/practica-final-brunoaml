import "./css/UserForm.css";

const UserForm = ({submitUser}) => {   
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const onSubmit = (e) => {
        console.log("UserForm - onSubmit" + {username:username, password:password});
        e.preventDefault();
        submitUser({username:username, password:password});
      };
    return <form onSubmit={onSubmit}>
        <label htmlFor="loginForm-username">Nombre de usuario:</label>
        <input id="loginForm-username" type="text" onChange={(e) => setUsername(e.target.value)}/>
        <label htmlFor="loginForm-password">Contraseña:</label>
        <input id="loginForm-password" type="password" onChange={(e) => setPassword(e.target.value)}/>
        <button id="loginForm-submit" type="button">Aceptar</button>
    </form>
};

export default UserForm;