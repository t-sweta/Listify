import React, {useState} from "react";


function TodoList() {
  const[items, setItems] = useState([]);
  const[newItems, setNewItems] = useState("");
  const addItem = () =>{
    if(newItems){
      setItems([...items,newItems])
      setNewItems("")
    }
  }

  return (
    <div>
     
      
    </div>
  )
}

export default TodoList
