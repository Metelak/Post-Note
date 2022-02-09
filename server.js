// connect to installed package paths
const fs = require('fs');
const path = require('path');
const express = require('express');
// connect notes to json file
const { notes } = require('./db/db.json');
// Heroku running app through port
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

function addNote(body, createdNotes) {
    const note = body;
    createdNotes.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: createdNotes }, null, 2)
    );
    return note;
}

function confirmNotes(notes) {
    if (!notes.title || typeof notes.title !== 'string') {
        return false;
    }
    if (!notes.text || typeof notes.text !== 'string') {
        return false;
    }
    return true;
}

// app.get('/', (req, res) => {
//     res.json({
//         message: 'Hello World'
//     });
// });

app.get('/api/notes', (req, res) => {
    let result = notes;
    if (result) {
        res.json(result);
    }
});

// routing api/notes to read/return using json file
app.post('/api/notes', (req, res) => {
    // req.body.id = notes.length.toString();
    console.log('new note received!');
    const newNote = addNote(req.body, notes);
    res.json(addNote);
});

// read all notes from json file and remove note with given id property
app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;

    const allNotes = notes.findIndex(p => p.id == id);
    notes.splice(allNotes, 1);
    res.send()
})


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
app.use((req, res) => {
    res.status(404).end();
});


// module.exports = app;

// the app is listening to the port variable defined
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});