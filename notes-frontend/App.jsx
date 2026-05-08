import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  const API = import.meta.env.VITE_API_URL;

  // Fetch notes
  const fetchNotes = async () => {
    const res = await fetch(`${API}/notes`);
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add note
  const addNote = async () => {
    if (!text) return;

    await fetch(`${API}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    setText("");
    fetchNotes();
  };

  // Delete note
  const deleteNote = async (id) => {
    await fetch(`${API}/notes/${id}`, {
      method: "DELETE",
    });

    fetchNotes();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notes App</h1>

      <input
        type="text"
        placeholder="Enter note"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addNote}>Add</button>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.text}

            <button onClick={() => deleteNote(note.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;