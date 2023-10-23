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

  const deleteItem=(index)=>{
    const updatedItems=[...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
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
          // <TodoListItem keys={index} task={item} />
          <li key={index}>
            <div className="tasks">
              <div className="left">
                <i class="fa-regular fa-circle"></i>
                <p>{item}</p>
              </div>
              <div className="right">
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-pen-to-square"></i>
                <i class="fa-regular fa-trash-can" onClick={()=> deleteItem(index)}></i>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList
