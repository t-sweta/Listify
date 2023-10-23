import React from "react"

export default function TodoListItem(props){
    // let key=props.key;
    // let item=props.item;
    return(
        <li key={props.keys}>{props.task}</li>
    )
}