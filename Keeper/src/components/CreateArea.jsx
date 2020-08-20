import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  let [{ content, title }, setPost] = useState("");
  const [isExpanded, setExpanded] = useState(false);

  function handleChange(event) {
    const newValue = event.target.value;
    const name = event.target.name;
    if (name === "title") {
      setPost((prev) => ({
        content: prev.content,
        title: newValue
      }));
    }
    if (name === "content") {
      setPost((prev) => ({
        content: newValue,
        title: prev.title
      }));
    }
  }

  // function handleChange(event) {
  //   const { name, value } = event.target;

  //   setNote(prevNote => {
  //     return {
  //       ...prevNote,
  //       [name]: value
  //     };
  //   });
  // }

  function handleOnClick(event) {
    props.onAdd(title, content);
    setPost("");
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            placeholder="Title"
            value={[title]}
            onChange={handleChange}
          />
        )}
        <textarea
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          value={[content]}
          onChange={handleChange}
          onClick={expand}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={handleOnClick}>
            <AddIcon />{" "}
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
