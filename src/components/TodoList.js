import React, { useState } from "react";
import "./TodoList.css";

function TodoList() {
  const [items, setItems] = useState([]);
  const [newItems, setNewItems] = useState("");
  const [updatedText, setUpdatedText] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const addItem = () => {
    if (newItems) {
      setItems([
        ...items,
        { text: newItems, completed: false, bookmark: false },
      ]);
      setNewItems("");
    }
  };

  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
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
  };

  const completeTaskHandler = (index) => {
    const updatedItems = [...items];
    updatedItems[index].completed = !updatedItems[index].completed;
    setItems(updatedItems);
  };
  const priorityHandler = (index) => {
    // let myObj = {
    //   text: items[index].text,
    //   completed: items[index].completed,
    //   bookmark: !items[index].bookmark,
    // };

    // if(myObj.bookmark){
    //   const updatedItems = [myObj, ...items];
    //   updatedItems.splice(index+1, 1);
    //   setItems(updatedItems);
    //   items[0].bookmark=!items[0].bookmark;

    const updatedItems = [...items];
    const itemToMove = updatedItems[index];
    //here we are setting the bookmark property of the clicked item to true
    // and we are setting the new items's bookmark property rather than the actual bookmark hence actual bookmark will always be true so no need to make it false afterwards
    itemToMove.bookmark = !itemToMove.bookmark;
    updatedItems.splice(index, 1);
    //adding the item to the top
    if (itemToMove.bookmark) {
      updatedItems.unshift(itemToMove);
    }
    setItems(updatedItems);
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
        />
        <div className="button" onClick={addItem}>
          Add
        </div>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <div className="tasks">
              <div className="left">
                <i
                  className={
                    item.completed
                      ? "fa-regular fa-circle-check complete-check"
                      : "fa-regular fa-circle"
                  }
                  onClick={() => completeTaskHandler(index)}
                ></i>
                {editIndex === index ? (
                  <div>
                    <input
                      className="edit-input"
                      type="text"
                      value={updatedText}
                      onChange={(e) => setUpdatedText(e.target.value)}
                    />
                  </div>
                ) : (
                  <p className="actual-task">{item.text}</p>
                )}
              </div>
              <div className="right">
                <i
                  class="fa-regular fa-star"
                  onClick={() => priorityHandler(index)}
                ></i>
                {editIndex !== index ? (
                  <i
                    class="fa-regular fa-pen-to-square edit-icon"
                    onClick={() => editHandler(index)}
                  ></i>
                ) : (
                  <i
                    class="fa-solid fa-check tick-icon"
                    onClick={() => saveEdit(index)}
                  ></i>
                )}
                <i
                  class="fa-regular fa-trash-can delete-icon"
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
