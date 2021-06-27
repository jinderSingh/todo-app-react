import './TodoItem.css';

const TodoItem = ({ todo: { id, title, description }, children }) => {
  return (
    <li className="_todo_list_item" key={id}>
      <h3>{title}</h3>
      <span className="_todo_description">{description}</span>

      <div className="_todo_children_container">{children}</div>
    </li>
  );
};

export default TodoItem;
