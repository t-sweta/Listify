import React, { useState, useEffect } from "react";
import "./TodoList.css";

function TodoList() {
  const [items, setItems] = useState([]);
  const [newItems, setNewItems] = useState("");
  const [updatedText, setUpdatedText] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  //adding data from local storage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem("todolist");
    if (savedData) {
      setItems(JSON.parse(savedData));
    }
  }, []);

  const addItem = () => {
    if (newItems) {
      const newItem = { text: newItems, completed: false, bookmark: false };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      setNewItems("");

      //saving the updated items to local storage
      localStorage.setItem("todolist", JSON.stringify(updatedItems));
    }
  };

  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);

    //saving the updated items to local storage
    localStorage.setItem("todolist", JSON.stringify(updatedItems));
  };

  const editHandler = (index) => {
    setUpdatedText(items[index].text);
    setEditIndex(index);
  };

  const saveEdit = (index) => {
    const updatedItems = [...items];
    updatedItems[index].text = updatedText;
    setItems(updatedItems);
    setEditIndex(-1);
    setUpdatedText("");

    //saving the updated items to local storage
    localStorage.setItem("todolist", JSON.stringify(updatedItems));
  };

  const completeTaskHandler = (index) => {
    const updatedItems = [...items];
    updatedItems[index].completed = !updatedItems[index].completed;
    setItems(updatedItems);

    //saving the updated items to local storage
    localStorage.setItem("todolist", JSON.stringify(updatedItems));
  };

  const priorityHandler = (index) => {
    const updatedItems = [...items];
    const itemToMove = updatedItems[index];
    itemToMove.bookmark = !itemToMove.bookmark;
    if (itemToMove.bookmark) {
      //if so then move it to the top
      updatedItems.splice(index, 1); //removing the item form its current position
      updatedItems.unshift(itemToMove);
    } else {
      // if its unmarked,move it to the original position
      updatedItems.splice(index, 1);
      updatedItems.push(itemToMove);
    }
    setItems(updatedItems);

    //saving the updated items to local storage
    localStorage.setItem("todolist", JSON.stringify(updatedItems));
  };

  const goUp = (index) => {
    if (index !== 0) {
      const updatedItems = [...items];
      let temp = updatedItems[index - 1];
      updatedItems[index - 1] = updatedItems[index];
      updatedItems[index] = temp;
      setItems(updatedItems);
    }
  };

  const goDown = (index) => {
    if (index !== items.length - 1) {
      const updatedItems = [...items];
      let temp = updatedItems[index + 1];
      updatedItems[index + 1] = updatedItems[index];
      updatedItems[index] = temp;
      setItems(updatedItems);
    }
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  const handleEditKeyDown = (e, index) => {
    if (e.key === "Enter") {
      saveEdit(index);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <div className="input">
        <input
          type="text"
          value={newItems}
          onChange={(e) => setNewItems(e.target.value)}
          placeholder="Add new task"
          onKeyDown={handleInput}
        />
        <div className="button hover" onClick={addItem}>
          Add
        </div>
      </div>
      <ul className="all-tasks">
        {items.map((item, index) => (
          <li key={index}>
            <div className="tasks">
              <div className="left">
                <i
                  className={
                    item.completed
                      ? "fa-regular fa-circle-check complete-check hover"
                      : "fa-regular fa-circle hover"
                  }
                  onClick={() => completeTaskHandler(index)}
                ></i>
                {editIndex === index ? (
                  <div className="right-task">
                    <input
                      className="edit-input"
                      type="text"
                      value={updatedText}
                      onChange={(e) => setUpdatedText(e.target.value)}
                      onKeyDown={(e) => handleEditKeyDown(e, index)}
                    />
                  </div>
                ) : item.completed ? (
                  <p className="actual-task complete-line">{item.text}</p>
                ) : (
                  <p className="actual-task">{item.text}</p>
                )}
              </div>
              <div className="right">
                <i
                  class="fa-solid fa-chevron-up up-down hover"
                  onClick={() => goUp(index)}
                ></i>
                <i
                  class="fa-solid fa-chevron-down up-down hover"
                  onClick={() => goDown(index)}
                ></i>
                <i
                  className={
                    item.bookmark
                      ? "fa-regular fa-star colored-star hover"
                      : "fa-regular fa-star hover"
                  }
                  onClick={() => priorityHandler(index)}
                ></i>
                {editIndex !== index ? (
                  <i
                    class="fa-regular fa-pen-to-square edit-icon hover"
                    onClick={() => editHandler(index)}
                  ></i>
                ) : (
                  <i
                    class="fa-solid fa-check tick-icon hover"
                    onClick={() => saveEdit(index)}
                  ></i>
                )}
                <i
                  class="fa-regular fa-trash-can delete-icon hover"
                  onClick={() => deleteItem(index)}
                ></i>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
