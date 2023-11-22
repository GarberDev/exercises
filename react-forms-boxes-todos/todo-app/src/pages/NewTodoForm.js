import React, { useState } from "react";

function NewTodoForm({ addTodo }) {
  const [task, setTask] = useState("");

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ id: Date.now(), task });
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={handleChange}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default NewTodoForm;
