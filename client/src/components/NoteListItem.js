import "./css/NoteListItem.css";
import { useState, useContext, useEffect } from "react";
import Modal from "./Modal";
import {  NavLink, useRouteMatch } from "react-router-dom";
import useApi from "../hooks/useApi";
import user from "../contexts/user";

const NoteListItem = ({item, loadNotes}) => { 
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);  
  const match = useRouteMatch();
  const userContext = useContext(user);  
  const request = useApi("/api/notes/" + item.id, userContext.current.token, {}, false);
  useEffect(() => {
      if (!request.loading && request.data != undefined) {
          console.log(request.data);
          loadNotes();
      }
    }, [request.loading]);
  const deleteNote = () => {
      request.updateParams({
          method: "DELETE"
      });
      request.perform();
  };
  return <> 
      <li key={item.id} className="noteListItem">
          <p>{item.title}</p>
          <p>{item.content}</p>
          <nav className="secondary">
            <NavLink to={`${match.url}/edit/` + item.id} activeClassName="active">Editar</NavLink>
            <button onClick={openModal}>Borrar</button>
          </nav>
        </li>
        <Modal show={showModal} onClose={closeModal}>
            <h3>¿Quieres borrar la nota?</h3>
            <button onClick={deleteNote}>Confirmar</button>
            <button onClick={closeModal}>Cancelar</button>
        </Modal>
  </>
}   
export default NoteListItem;