import React, { useState } from "react";
import "./EightBall.css"; // Make sure to style the component
import defaultAnswers from "./answers.json"; // Your answers array
import { choice } from "./random"; // Utility to select a random item

function EightBall({ answers = defaultAnswers }) {
  const [answer, setAnswer] = useState({
    msg: "Think of a Question.",
    color: "black",
  });

  function handleClick() {
    setAnswer(choice(answers));
  }

  return (
    <div
      className="EightBall"
      onClick={handleClick}
      style={{ backgroundColor: answer.color }}
    >
      <b>{answer.msg}</b>
    </div>
  );
}

export default EightBall;
