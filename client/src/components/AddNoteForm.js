import "./css/AddNoteForm.css";
import { useState, useContext, useEffect } from "react";
import { useHistory} from "react-router";
import useApi from "../hooks/useApi";
import user from "../contexts/user";

const AddNoteForm = () => {   
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const history = useHistory();
    const userContext = useContext(user);
    const request = useApi("/api/notes", userContext.current.token, {}, false);
    useEffect(() => {
        if (!request.loading && request.data != undefined) {
            console.log(request.data);
            history.goBack();
        }
      }, [request.loading]);
    const addNote = (title,  content, userId) => {
        request.updateParams({
            method: "POST",
            body: JSON.stringify({title, content, userId}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        request.perform();
    };
    const onSubmit = (e) => {
        e.preventDefault();
        addNote(title, content, userContext.current.userId);
    };
  return <form onSubmit={onSubmit}>
        <label htmlFor="addNoteForm-title">Título:</label>
        <input id="addNoteForm-title" type="text" onChange={(e) => setTitle(e.target.value)}/>
        <label htmlFor="addNoteForm-content">Contenido:</label>
        <input id="addNoteForm-content" type="text" onChange={(e) => setContent(e.target.value)}/>
        <button id="addNoteForm-submit" type="submit">Aceptar</button>
    </form>
};

export default AddNoteForm;