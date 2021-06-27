import React, { useEffect, useState } from "react";
import Todo from "../todo/Todo";
import TodoItem from "../todo-item/TodoItem";
import "./Todos.css";

function Todos() {
  const initialValue = {
    title: "",
    description: "",
    completed: false,
    id: null,
  };

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({ ...initialValue });
  const [displayForm, setDisplayForm] = useState(false);

  const apiUri = `/api/v1/todos`;

  useEffect(() => fetchTodos(), []);

  const handleFormVisibility = (item) => {
    setTodo({ ...(item || initialValue) });
    setDisplayForm(true);
  };

  const handleDelete = async (id) => {
    await fetch(`${apiUri}/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  const saveHandler = async () => {
    let method = "POST";
    let uri = apiUri;
    if (todo.id) {
      method = "PUT";
      uri = `${uri}/${todo.id}`;
    }
    try {
      await fetch(uri, {
        method,
        body: JSON.stringify(todo),
        headers: { "Content-Type": "application/json" },
      });
      fetchTodos();
      setTodo({ ...initialValue });
    } catch (error) {
      console.log(error);
    }
  };

  const resetTodo = () => setTodo({ ...initialValue, id: todo && todo.id });

  const fetchTodos = async () =>
    fetch(apiUri, { headers: { "Content-Type": "application/json" } })
      .then((res) => res && res.json())
      .then((res) => setTodos(res))
      .catch((error) => console.log(error));

  return (
    <div className="_todo_content_container">
      <div className="_todo_list_wrapper">
        <div className="_todos_actions_wrapper">
          <button
            className="_btn _btn_info"
            onClick={() => handleFormVisibility(null)}
          >
            + Add todo
          </button>
        </div>
        <h1 className="_todo_list_header">Todos</h1>
        <ul className="_todo_list">
          {(todos || []).map((el) => (
            <div className="_d_flex _todo_item_wrapper" key={el.id}>
              <div className="_d_flex _gap_1 _flex_end _flex_1">
                <button
                  onClick={handleDelete.bind(this, el.id)}
                  className="_btn_round _btn_danger _text_bold"
                >
                  X
                </button>
                <button
                  onClick={handleFormVisibility.bind(this, el)}
                  className="_btn_round _btn_warn _text_bold"
                >
                  -
                </button>
              </div>
              <TodoItem todo={el}></TodoItem>
            </div>
          ))}
        </ul>
      </div>

      {displayForm ? (
        <div className="_todo_form_wrapper">
          <Todo
            todo={todo}
            changeCallback={(values) => setTodo({ ...todo, ...values })}
          >
            <div className="_form_actions_container">
              <button
                className="_btn _btn_success"
                type="button"
                onClick={saveHandler}
              >
                Save
              </button>
              <button
                className="_btn _btn_danger"
                type="button"
                onClick={resetTodo}
              >
                Clear
              </button>
            </div>
          </Todo>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Todos;
