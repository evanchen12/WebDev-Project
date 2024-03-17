import React, { useState } from "react";
import TodoForm from "./todoForm";
import TodoItem from "./todoItem";
import { useSelector } from "react-redux";
import { LabState, TodoType } from "../../../Store";

function TodoList() {
  const { todos } = useSelector((state: LabState) => state.todosReducer);

  return (
    <div>
      <h2>Todo List</h2>
      <ul className="list-group">
        <TodoForm />

        {todos.map((todo) => (
          <TodoItem todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;