// connect to installed package paths
const fs = require("fs");
const path = require("path");
const express = require("express");
// connect notes to json file
const { notes } = require("./db/db.json");
// Heroku running app through port
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

function validateNotes(notes) {
  if (!notes.title || typeof notes.title !== "string") {
    return false;
  }
  if (!notes.text || typeof animal.species !== "string") {
    return false;
  }
  return true;
}

// routing api/notes to read/return using json file
app.post('/api/notes', (req, res) => {
  req.body.id = notes.length.toString();
  console.log("new note received!");
  const newNote = createNewNote(req.body, notes);
  res.json(newNote);
});

app.get('/api/notes', (req, res) => {
  let results = notes;
  res.json(results);
});

// read all notes from json file and remove note with given id property
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  const notesIndex = notes.findIndex((p) => p.id == id);
  notes.splice(notesIndex, 1);
  res.send();
});

// html routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/notes.html'));
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
// });

module.exports = app;

// the app is listening to the port variable defined
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

// // Use fs for file management and path for directing files
// const fs = require("fs");
// const path = require("path");

// // Set up Express.js
// const express = require("express");
// const { formatWithOptions } = require("util"); //this was created by my computer, take out?
// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static("./public"));

// // Assign port
// const PORT = process.env.PORT || 3001;

// // Paths to routes
// const apiRoutes = require('./routes/apiRoutes/index.js');
// const htmlRoutes = require('./routes/htmlRoutes');

// // Use apiRoutes
// app.use('/api', apiRoutes);

// // Use htmlRoutes
// app.use('/', htmlRoutes);

// // Message on console confirms displaying on selected port.
// app.listen(PORT, () => {
//   console.log(`API server now on port ${PORT}!`);
// });
