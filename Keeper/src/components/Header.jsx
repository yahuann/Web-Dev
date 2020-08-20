import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";

function Header() {
  return (
    <header>
      <HighlightIcon style={{ fill: "white" }} />
      <h1>Keeper</h1>
    </header>
  );
}

export default Header;
