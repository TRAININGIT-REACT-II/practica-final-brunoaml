import "./css/EditNoteForm.css";
import { useState, useContext, useEffect } from "react";
import { useHistory, useParams} from "react-router";
import useApi from "../hooks/useApi";
import user from "../contexts/user";

const EditNoteForm = () => {   
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const history = useHistory();
    const params = useParams();
    const userContext = useContext(user);
    const request = useApi("/api/notes/" + params.id, userContext.current.token, {}, false);
    useEffect(() => {
        if (!request.loading && request.data != undefined) {
            console.log(request.data);
            history.goBack();
        }
      }, [request.loading]);
    const addNote = (title,  content, userId) => {
        request.updateParams({
            method: "PATCH",
            body: JSON.stringify({title, content, userId}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        request.perform();
    };
    const onSubmit = (e) => {
        e.preventDefault();
        addNote(title, content, userContext.current.id);
    };
  return <form onSubmit={onSubmit}> 
        <label htmlFor="editNoteForm-title">Título:</label>
        <input id="editNoteForm-title" type="text"onChange={(e) => setTitle(e.target.value)}/>
        <label htmlFor="editNoteForm-content">Contenido:</label>
        <input id="editNoteForm-content" type="text" onChange={(e) => setContent(e.target.value)}/>
        <button id="editNoteForm-submit" type="submit">Aceptar</button>
    </form>
};

export default EditNoteForm;