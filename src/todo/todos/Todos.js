import { useState } from "react";
import Todo from "../todo/Todo";
import TodoItem from "../todo-item/TodoItem";
import "./Todos.css";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_TODO,
  DELETE_TODO,
  LIST_TODO,
  UPDATE_TODO,
} from "../../shared/queries/todo.query";

function Todos() {
  const initialValue = {
    title: "",
    description: "",
    completed: false,
    id: null,
  };

  const queriesToRefetch = [{ query: LIST_TODO }];

  const [todo, setTodo] = useState({ ...initialValue });
  const [displayForm, setDisplayForm] = useState(false);
  const { data } = useQuery(LIST_TODO, {
    fetchPolicy: "network-only",
  });
  const [addTodo] = useMutation(ADD_TODO, { refetchQueries: queriesToRefetch });
  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: queriesToRefetch,
  });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: queriesToRefetch,
  });

  const handleFormVisibility = (item) => {
    setTodo({ ...(item || initialValue) });
    setDisplayForm(true);
  };

  const handleDelete = (id) => {
    deleteTodo({ variables: { id } });
  };

  const saveHandler = () => {
    const { id, ...others } = todo;
    if (todo.id) {
      const updatedTodo = ["title", "description", "completed"].reduce(
        (prev, next) => {
          prev[next] = todo[next];
          return prev;
        },
        {}
      );
      updateTodo({ variables: { id: todo.id, todo: updatedTodo } });
      return;
    }
    addTodo({ variables: { todo: { ...others } } });
  };

  const resetTodo = () => setTodo({ ...initialValue, id: todo && todo.id });

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
          {((data && data.todos) || []).map((el) => (
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
