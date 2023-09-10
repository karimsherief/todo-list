import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="todos-container">
      <Droppable droppableId="activeTodos">
        {(provided, snapshot) => (
          <div
            className={`active-todos ${
              snapshot.isDraggingOver ? "dragactive" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2>Active Tasks</h2>
            <ul>
              {todos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                  key={todo.id}
                />
              ))}
            </ul>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="completedTodos">
        {(provided, snapshot) => (
          <div
            className={`completed-todos ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2>Completed Tasks</h2>
            <ul>
              {completedTodos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  todos={completedTodos}
                  setTodos={setCompletedTodos}
                  key={todo.id}
                />
              ))}
            </ul>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
