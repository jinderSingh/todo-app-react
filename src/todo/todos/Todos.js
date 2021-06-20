import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import Todo from "../todo/Todo";
import "./Todos.css";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [removed, setRemoved] = useState(false);
  const { path, url } = useRouteMatch();
  const apiUri = `/api/v1/todos`;

  async function handleDelete(id) {
    await fetch(`${apiUri}/${id}`, { method: "DELETE" });
    setRemoved(true);
  }

  const todoItem = ({ id, title, description }) => (
    <li className="_todo_list_item" key={id}>
      <Link className="_todo_item_link" to={`${url}/${id}`}>
        {title}
      </Link>
      <span className="_todo_description">{description}</span>
      <button
        onClick={handleDelete.bind(this, id)}
        className="_btn _btn_danger"
      >
        Delete
      </button>
    </li>
  );

  useEffect(
    () =>
      fetch(apiUri, { headers: { "Content-Type": "application/json" } })
        .then((res) => res && res.json())
        .then((res) => setTodos(res))
        .catch((error) => console.log(error)),
    [removed]
  );
  return (
    <div className="_todo_content_container">
      <div className="_todo_list_wrapper">
        <div className="_todos_actions_wrapper">
          <Link className="_btn _btn_info" to={`${path}/todo`}>
            + Add todo
          </Link>
        </div>
        <h2>Todos</h2>
        <ul className="_todo_list">
          {(todos || []).map((todo) => todoItem(todo))}
        </ul>
      </div>
      <div className="_todo_form_wrapper">
        <Switch>
          <Route path={`${path}/:todoId`}>
            <Todo />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Todos;
