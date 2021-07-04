import "./css/Layout.css";
import ThemeToggle from "./ThemeToggle";
import { useContext} from "react";
import { useHistory} from "react-router";
import user from "../contexts/user";
/**
 * Engloba el contenido principal en un contendor para 
 * centrar el layout
 */
const Layout = ({ title, children }) => {
  const history = useHistory();
  const userContext = useContext(user);

  const onClickLogout = () => {
    userContext.update("");
    history.push("/login");
  }
  return <div className="layout">
    <header className="layout_header">
      <h1>{title}</h1>
      <div className="layout_opts">
        <div className="layout_theme">
          <ThemeToggle />
        </div>
      </div>
      <div className="layout_opts">
        {userContext.current !="" && <button onClick={onClickLogout}>Cerrar Sesión</button>}
      </div>
    </header>
    <main>
      {children}
    </main>
  </div>
};

export default Layout;