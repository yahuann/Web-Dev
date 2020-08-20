import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {
  function handleDel() {
    props.onDel(props.index);
  }
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleDel}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
