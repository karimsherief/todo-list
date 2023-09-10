import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: todo,
          isDone: false,
        },
      ]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    let add;
    let active = todos;
    let complete = completedTodos;

    if (destination.droppableId === source.droppableId) {
      if (source.droppableId === "activeTodos") {
        active.map((todo) => (todo.isDone = false));
        [active[source.index], active[destination.index]] = [
          active[destination.index],
          active[source.index],
        ];
      } else {
        complete.map((todo) => (todo.isDone = true));

        [complete[source.index], complete[destination.index]] = [
          complete[destination.index],
          complete[source.index],
        ];
      }
    } else {
      if (source.droppableId === "activeTodos") {
        add = active[source.index];
        add.isDone = true;
        active.splice(source.index, 1);
      } else {
        add = complete[source.index];
        add.isDone = false;
        complete.splice(source.index, 1);
      }

      if (destination.droppableId === "activeTodos") {
        active.splice(destination.index, 0, add);
      } else {
        complete.splice(destination.index, 0, add);
      }
    }
    setCompletedTodos(complete);
    setTodos(active);
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  };
  useEffect(() => {
    const todos = localStorage.getItem("todos");
    const completedTodos = localStorage.getItem("completedTodos");
    if (todos != null) {
      setTodos(JSON.parse(todos));
    }
    if (completedTodos != null) {
      setCompletedTodos(JSON.parse(completedTodos));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  useEffect(() => {
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [completedTodos]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <h1>Todo List</h1>
        <TodoInput todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
