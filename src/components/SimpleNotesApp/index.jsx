import { useState } from "react";
import "./styles.scss";

const SimpleNotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");

  const removeNote = (noteToRemove) => {
    setNotes(notes.filter((note) => note!== noteToRemove))
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
      <div className="button" onClick={() => setNotes([...notes, note])}>
        Add Note
      </div>
      <div className="added-notes">
        {notes &&
          notes.map((note, index) => {
            return (
              <div key={index} className="note">
                <h4>{note}</h4>
                <div className="remove-button" onClick={() => removeNote(note)}>X</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SimpleNotesApp;
