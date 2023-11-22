import React from "react";

function Todo({ id, task, removeTodo }) {
  const handleRemove = () => {
    removeTodo(id);
  };

  return (
    <div>
      {task}
      <button onClick={handleRemove}>X</button>
    </div>
  );
}

export default Todo;
