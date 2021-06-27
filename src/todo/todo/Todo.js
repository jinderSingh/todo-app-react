import "./Todo.css";

function Todo({ todo, children, changeCallback }) {
  function handleChanges({ target }) {
    const value = target.type === "checkbox" ? target.checked : target.value;
    changeCallback({ ...todo, [target.name]: value });
  }

  return (
    <form action="#" onSubmit={e => e.preventDefault()} className="_form">
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
            required
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
            required
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
      {children}
    </form>
  );
}

export default Todo;
