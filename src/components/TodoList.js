import React, { useState } from "react";
import TodoListItem from "./TodoListItem";

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
    <div>
      <h1>Todo List</h1>
      <input type="text"
        value={newItems}
        onChange={(e) => setNewItems(e.target.value)}
        placeholder="Add new task"
      />
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map((item, index) => (
          <TodoListItem keys={index} task={item} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList
