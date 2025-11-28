import TodoItem from "./ToDoItem";
import { todoGroups } from "../mock/scheduleTodoData";
import { useNavigate } from "react-router-dom";
import Plus from "../assets/plus.svg?react";

export default function TodoList() {
  const navigate = useNavigate();
  const isLeader = true;

  return (
    <section className="bg-white rounded-[20px] border-[1.5px] border-main3 pt-5 px-5 pb-2">
      <div className="flex items-center justify-between">
        <h1 className="text-[18px] font-bold mb-2 text-black1">To-Do</h1>
        {isLeader && (<button onClick={() => navigate("/CreateToDo")} className="px-2 py-1 bg-main4 rounded-[12px] items-center flex gap-1">
          <Plus className="text-point" />
          <span className="text-point text-[14px] font-medium translate-y-[1px] ">새로운 To-Do</span>
        </button>)}
      </div>

      {todoGroups.map((group) => (
        <div key={group.id} className="space-y-1 pb-2">
          <span className="inline-block px-2 py-1 bg-main4 font-black1 text-[12px] font-medium rounded-[20px]">
            {group.groupName}
          </span>
          {group.todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              taskName={todo.taskName}
              completedCount={todo.completedCount}
              totalCount={todo.totalCount}
              isChecked={todo.isChecked}
              isLast={index === group.todos.length - 1}
              path={`/todo/${todo.id}`}
            />
          ))}
        </div>
      ))}
    </section>
  );
}
