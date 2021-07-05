import { gql } from "@apollo/client";

export const LIST_TODO = gql`
  query {
    todos {
      title
      description
      completed
      id
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($todo: TodoCreateCommand!) {
    add(createCommand: $todo)
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $todo: TodoUpdateCommand!) {
    update(updateCommand: $todo, id: $id)
  }
`;

export const DELETE_TODO = gql`
  mutation RemoveTodo($id: ID!) {
    remove(id: $id)
  }
`;
