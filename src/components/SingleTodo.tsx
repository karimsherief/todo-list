import React, { useEffect, useRef, useState } from "react";
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { Todo } from "../model";
import { Draggable } from "react-beautiful-dnd";
interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (_id: number) => {
    setTodos(todos.filter((todo) => todo.id !== _id));
  };

  const handleSubmit = (e: React.FormEvent, _id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) =>
        todo.id === _id ? { ...todo, name: editTodo } : todo
      )
    );
    setEdit((prev) => !prev);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  useEffect(() => {}, []);
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <li
          className="task"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {!edit ? (
            todo.isDone ? (
              <s className="task-name">{todo.name}</s>
            ) : (
              <p className="task-name">{todo.name}</p>
            )
          ) : (
            <form
              onSubmit={(e) => handleSubmit(e, todo.id)}
              className="edit-form"
            >
              <input
                type="text"
                value={editTodo}
                onChange={(e) => {
                  if (e.target.value) {
                    setEditTodo(e.target.value);
                  }
                }}
                ref={inputRef}
              />
              <button type="submit">
                <AiOutlineCheck />
              </button>
            </form>
          )}
          <div className="options">
            <button
              onClick={() => setEdit((prev) => !prev)}
              disabled={edit || todo.isDone}
              style={{
                pointerEvents: edit || todo.isDone ? "none" : "auto",
                cursor: edit || todo.isDone ? "not-allowed" : "pointer",
                opacity: edit || todo.isDone ? ".5" : "1",
              }}
              className="edit-btn"
            >
              <AiFillEdit />
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              className="delete-btn"
            >
              <AiFillDelete />
            </button>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default SingleTodo;
