import { useState } from "react";
import "./styles.scss";

const SimpleNotesApp = () => {
  // using useState in place of local storage
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState(null);
  const [isError, setIsError] = useState(false);

  const removeNote = (noteIndex) => {
    setNotes(notes.filter((_, index) => index !== noteIndex))
  }

  const addNote = () => {
    if (!note) {
      setIsError(true);
      return; 
    };

    setIsError(false);
    setNotes([...notes, note]); 
  }

  return (
    <div className="notes-container">
      <h1>Simple Notes App</h1>
      <textarea
        className="notes-textarea"
        autoFocus
        placeholder="Add a note..."
        cols="50"
        rows="10"
        onChange={(e) => setNote(e.target.value)}
      ></textarea>
      <div className="button" onClick={addNote}>
        Add Note
      </div>
      {isError && <div className="error">Please enter a note in before submitting</div>}
      <div className="added-notes">
        {notes &&
          notes.map((note, index) => {
            return (
              <div key={index} className="note">
                <h4>{note}</h4>
                <div className="remove-button" onClick={() => removeNote(index)}>X</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SimpleNotesApp;
