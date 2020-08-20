import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  // let [notes, setNotes] = useState([
  //   {
  //     title: "Note title",
  //     content: "Note content",
  //     id: 0
  //   }
  // ]);

  let [notes, setNotes] = useState([]);

  function handleDel(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function handleAdd(newTitle, newContent) {
    const newNote = {
      title: newTitle,
      content: newContent,
      id: notes.length
    };

    setNotes(function (prevs) {
      return [...prevs, newNote];
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={handleAdd} />
      {notes.map((note, index) => (
        <Note
          key={index}
          index={index}
          title={note.title}
          content={note.content}
          onDel={handleDel}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
