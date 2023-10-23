import React from "react"

export default function TodoListItem(props) {
    return (
        <li key={props.keys}>{props.task}</li>
    )
}