import React from "react";
import { useEffect, useState} from "react";
import "./App.css";
import Layout from "./components/Layout";
import { THEMES } from "./constants/themes";
import Theme from "./contexts/theme";
import User from "./contexts/user";
import Register from "./views/Register";
import Login from "./views/Login";
import Notes from "./views/Notes";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

const App = () => {
  const [theme, setTheme] = useState(THEMES.light);
  const [user, setUser] = useState("");
  useEffect(() => { 
    if (document.body.classList.value == "") {
      document.body.classList.add(theme);
    } else {
      document.body.classList.replace(
        document.body.classList.value,
        theme
      );
    }
  }, [theme]);
  return <Theme.Provider value={{ current: theme, update: setTheme}}>
  <User.Provider value={{ current: user, update: setUser}}>
    <Router>
      <Layout title="TrainingNotes">
        <nav className="secondary">
          {user==="" && <NavLink to="/login" activeClassName="active">Iniciar sesión</NavLink>}
        </nav>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
            <Route path="/notes">
              <Notes/>
            </Route>
      </Layout>
    </Router>
  </User.Provider>
  </Theme.Provider>
};
export default App;