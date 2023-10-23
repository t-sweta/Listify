import React, { useState } from "react";
import TodoListItem from "./TodoListItem";
import './TodoList.css';

function TodoList() {
  const [items, setItems] = useState([]);
  const [newItems, setNewItems] = useState("");
  const addItem = () => {
    if (newItems) {
      setItems([...items, newItems])
      setNewItems("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <div className="input">
        <input type="text"
          value={newItems}
          onChange={(e) => setNewItems(e.target.value)}
          placeholder="Add new task"
        />
        <div className="button" onClick={addItem}>Add</div>
      </div>
      <ul>
        {items.map((item, index) => (
          <TodoListItem keys={index} task={item} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList
