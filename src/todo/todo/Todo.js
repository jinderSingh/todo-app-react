import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Todo.css";

function Todo() {
  const initialValue = { title: "", description: "", completed: false };
  const [todo, setTodo] = useState({ ...initialValue });
  const { todoId } = useParams();
  const apiUri = "/api/v1/todos";

  useEffect(() => {
    if (todoId) {
      fetch(`${apiUri}/${todoId}`)
        .then((res) => res.json())
        .then((res) => setTodo(res));
    }
  }, [todoId]);

  function handleChanges({ target }) {
    const value = target.type === "checkbox" ? target.checked : target.value;
    setTodo({ ...todo, [target.name]: value });
  }

  async function saveHandler() {
    try {
      await fetch(apiUri, {
        method: "POST",
        body: JSON.stringify(todo),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
  }

  function resetTodo() {
    setTodo({ ...initialValue });
  }

  return (
    <form action="#" className="_form">
      <div className="_form_row">
        <div className="_input_container">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={todo.title}
            placeholder="Title"
            name="title"
            id="title"
            onChange={handleChanges}
          />
        </div>

        <div className="_input_container">
          <label htmlFor="description">Description</label>
          <textarea
            resize="false"
            row="3"
            col="6"
            placeholder="Description"
            name="description"
            id="description"
            value={todo.description}
            onChange={handleChanges}
          ></textarea>
        </div>

        <div className="_checkbox_container">
          <label htmlFor="completed">Completed</label>
          <input
            type="checkbox"
            id="completed"
            name="completed"
            value={todo.completed}
            checked={todo.completed}
            onChange={handleChanges}
          />
        </div>
      </div>
      <div className="_form_actions_container">
        <button
          className="_btn _btn_success"
          type="button"
          onClick={saveHandler}
        >
          Save
        </button>
        <button className="_btn _btn_danger" type="button" onClick={resetTodo}>
          Clear
        </button>
      </div>
    </form>
  );
}

export default Todo;
