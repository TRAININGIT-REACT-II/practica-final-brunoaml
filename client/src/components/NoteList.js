import "./css/NoteList.css";
import { useState, useContext, useEffect } from "react";
import NoteListItem from "./NoteListItem";
import { NavLink, useRouteMatch } from "react-router-dom";
import useApi from "../hooks/useApi";
import user from "../contexts/user";
import Loader from "./Loader";

const NoteList = () => {
  const match = useRouteMatch();
  const userContext = useContext(user);  
  const request = useApi("/api/notes", userContext.current.token, {}, false);
  const loadNotes = () => {
      request.updateParams({
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      });
      request.perform();
  };
  const [list, setList] = useState([]);
  useEffect(() => {
      if (!request.loading && request.data != undefined) {
          console.log(request.data);
          setList(request.data);
      }
    }, [request.loading]);
  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <>
      <h3 id="Notes">Lista de notas</h3>
      <ul className="noteList">
        {list.length === 0 ? <Loader /> : list.map((item) =>(
          <NoteListItem key={item.id} item={item} loadNotes={loadNotes}/>
        ))}
      </ul>
      <nav className="secondary">
        <NavLink to={`${match.url}/add`} activeClassName="active">Crear</NavLink>
      </nav>
    </>
    );
}
export default NoteList;