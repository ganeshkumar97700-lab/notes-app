const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let notes = [];

// Home route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Get all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// Add new note
app.post("/notes", (req, res) => {
  const newNote = {
    id: Date.now(),
    text: req.body.text,
  };

  notes.push(newNote);

  res.json({
    message: "Note added",
    note: newNote,
  });
});

// Delete note
app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  notes = notes.filter((note) => note.id !== id);

  res.json({
    message: "Note deleted",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});