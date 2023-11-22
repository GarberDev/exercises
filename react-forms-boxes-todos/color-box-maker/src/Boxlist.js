import React, { useState } from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";

function BoxList() {
  const [boxes, setBoxes] = useState([]);

  // Function to add a new box to the state
  const addBox = (newBox) => {
    setBoxes([...boxes, newBox]);
  };

  // Function to remove a box from the state
  const removeBox = (id) => {
    setBoxes(boxes.filter((box) => box.id !== id));
  };

  return (
    <div>
      <NewBoxForm addBox={addBox} />
      {boxes.map((box) => (
        <Box
          key={box.id}
          id={box.id}
          width={box.width}
          height={box.height}
          backgroundColor={box.backgroundColor}
          removeBox={removeBox}
        />
      ))}
    </div>
  );
}

export default BoxList;
