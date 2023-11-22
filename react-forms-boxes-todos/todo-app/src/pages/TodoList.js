import React, { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);

  // Function to add a new todo
  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  // Function to remove a todo
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <NewTodoForm addTodo={addTodo} />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          task={todo.task}
          removeTodo={removeTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
