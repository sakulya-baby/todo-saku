import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState([]);
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");
  const editTodo = [];
  React.useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);
  React.useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);
  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }
  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing("");
    setEditingText("");
  }
  return (
    <div className="App">
      <header className="Header">
        <h1>TODO-LIST</h1>
      </header>{" "}
      <form className="form" onSubmit={handleSubmit}>
        {" "}
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add Todo</button>{" "}
      </form>{" "}
      {todos.map((todo) => (
        <div className="div" key={todo.id}>
          {" "}
          {todoEditing === todo.id ? (
            <div>
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
                value={editingText}
              />{" "}
              <button className="fristBtn"
                onClick={() => toggleComplete(todo.id)}
                // onClick={(e) => setEditingText(e.target.value)}
              >
                submit
              </button>
            </div>
          ) : (
            <div>{todo.text}</div>
          )}
          <div>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>{" "}
            {/* <input
            // type="checkbox"
            onChange={() => toggleComplete(todo.id)}
            checked={todo.completed}
          /> */}
            {todoEditing === todo.id ? (
              ""
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>
                {" "}
                Edit Todo
              </button>
            )}{" "}
          </div>
        </div>
      ))}{" "}
    </div>
  );
}
export default App;
