const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

const uniqid = require("uniqid");

// Import existing notes from db/db.json
const { notes } = require("../../db/db.json");

// GET route '/notes' returns stored notes
router.get("/notes", (req, res) => {
  res.json(notes);
});

// POST route add a new user note
router.post("/notes", (req, res) => {

  let note = req.body;

  // Assign an id to the new note using uniqid npm
  note.id = uniqid();  

  // Add a note object to the note array
  notes.push(note);

  fs.writeFileSync(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify({ notes: notes }, null, 2)
  );

  // display note on page
  res.json(note);

  console.log("Your new note: " + note + " has been added!");
});

// DELETE route to remove note from page
router.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
  
    const isolateNote = notes.filter(note => note.id === id);
  
    // Loop to locate note by id, then remove that item
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === id) {
        notes.splice(i, 1);
      }
    };
  
    // Update the db.json file with notes array
    fs.writeFileSync(
      path.join(__dirname, "../../db/db.json"),
      JSON.stringify({ notes: notes }, null, 2)
    );

    res.json(isolateNote);
  });

module.exports = router;