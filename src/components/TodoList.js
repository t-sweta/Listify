import React, { useState } from "react";
import './TodoList.css';

function TodoList() {
  const [items, setItems] = useState([]);
  const [newItems, setNewItems] = useState("");
  const [updatedText, setUpdatedText] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const addItem = () => {
    if (newItems) {
      setItems([...items, newItems])
      setNewItems("")
    }
  }

  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  }

  const editHandler = (index) => {
    setUpdatedText(items[index]);
    setEditIndex(index);
  }

  const saveEdit = (index) => {
    const updatedItems = [...items];
    updatedItems[index] = updatedText;
    setItems(updatedItems);
    setEditIndex(-1);
    setUpdatedText("");
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
          <li key={index}>
            <div className="tasks">
              <div className="left">
                <i class="fa-regular fa-circle"></i>
                {editIndex === index ? (
                  <div>
                    <input
                      className="edit-input"
                      type="text"
                      value={updatedText}
                      onChange={(e) => setUpdatedText(e.target.value)}
                    />
                  </div>
                ) : (<p>{item}</p>)}
              </div>
              <div className="right">
                <i class="fa-regular fa-star"></i>
                {editIndex !== index ? (
                  <i class="fa-regular fa-pen-to-square" onClick={() => editHandler(index)}></i>
                ) : (
                  <i class="fa-solid fa-check" onClick={() => saveEdit(index)}></i>
                )}
                <i class="fa-regular fa-trash-can" onClick={() => deleteItem(index)}></i>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList
