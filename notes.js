const fs = require("fs");

const addNote = (title, body) => {
  const notes = loadNotes();
  //const duplicateNotes = notes.filter((note) => note.title === title);
  // const duplicateNotes = notes.filter(function (note) {
  //   return note.title === title;
  // });
  const duplicateNotes = notes.find((note) => {
    return note.title === title;
  });
  if (!duplicateNotes) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
  } else {
    console.log("Title take");
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesTokeep = notes.filter((note) => note.title !== title);
  if (notes.length > notesTokeep.length) {
    console.log("Note removed");
    saveNotes(notesTokeep);
  } else {
    console.log("No Note found");
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log("Your Notes");

  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(note.title);
    console.log(note.body);
  } else {
    console.log("Not found");
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
