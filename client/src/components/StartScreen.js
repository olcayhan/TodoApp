import React from "react";
import note from "../images/note.png";

export default function StartScreen() {
  return (
    <div className="startscreen">
      <img src={note} alt="home" />
      <h4>Focus on your day</h4>
      <p>Get things done with Tasks</p>
    </div>
  );
}
