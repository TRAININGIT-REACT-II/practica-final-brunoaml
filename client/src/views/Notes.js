import { Route, useRouteMatch } from "react-router-dom";
import AddNote from "./AddNote";
import EditNote from "./EditNote";
import NoteList from "../components/NoteList";
const Notes = () => {   
  const match = useRouteMatch();
  return (
    <>
      <Route path={`${match.url}`} component={NoteList} exact/>
      <Route path={`${match.url}/add`} component={AddNote}/>
      <Route path={`${match.url}/edit/:id`} component={EditNote}/>
    </>
  )
};

export default Notes;