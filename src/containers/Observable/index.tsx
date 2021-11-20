import React, { useRef } from "react";
import { useObservable } from "./core/hooks";
import todoService, { Todo, VisibilityFilter } from "./services/todo";
export default function TodoList() {
  const inputRef = useRef<HTMLInputElement>(null);

  const todos = useObservable(todoService.todos);
  const filter = useObservable(todoService.visibilityFilter);
  const visibleTodos = getVisibleTodos(todos, filter);

  // 添加
  const handleAdd = () => {
    const text = inputRef.current?.value;
    text && todoService.addTodo(text);
  };

  return (
    <div style={{ padding: "30px" }}>
      <div>
        <input ref={inputRef} type="text" />
        <button onClick={handleAdd}>ADD</button>
      </div>
      <p>
        展示:
        <FilterLink filter={VisibilityFilter.SHOW_ALL}>🌐 所有 All</FilterLink>
        ，
        <FilterLink filter={VisibilityFilter.SHOW_ACTIVE}>
          🚧 活跃 Active
        </FilterLink>
        ，
        <FilterLink filter={VisibilityFilter.SHOW_COMPLETED}>
          ✅ 完成Completed
        </FilterLink>
      </p>
      <ul>
        {visibleTodos.map((todo, index) => (
          <TodoItem key={index} todo={todo} index={index} />
        ))}
      </ul>
    </div>
  );
}
const TodoItem = ({
  todo: { text, completed },
  index,
}: {
  todo: Todo;
  index: number;
}) => {
  return (
    <li
      style={{
        textDecoration: completed ? "line-through" : "none",
        color: completed ? "green" : "",
      }}
      onClick={() => todoService.toggleTodo(index)}
    >
      {text}
    </li>
  );
};
const FilterLink = ({
  filter,
  children,
}: {
  filter: VisibilityFilter;
  children: React.ReactNode;
}) => {
  const activeFilter = useObservable(todoService.visibilityFilter);
  const active = filter === activeFilter;
  return active ? (
    <span style={{ color: "blue" }}>{children}</span>
  ) : (
    <span onClick={() => todoService.setVisibilityFilter(filter)}>
      {children}
    </span>
  );
};
function getVisibleTodos(todos: Todo[], filter: VisibilityFilter): Todo[] {
  switch (filter) {
    case VisibilityFilter.SHOW_ALL:
      return todos;
    case VisibilityFilter.SHOW_COMPLETED:
      return todos.filter((t) => t.completed);
    case VisibilityFilter.SHOW_ACTIVE:
      return todos.filter((t) => !t.completed);
  }
}
