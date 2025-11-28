import { useState } from "react";

import {
  todoGroups as initialTodoGroups,
  type TodoGroup,
} from "../mock/scheduleTodoData";

import CheckBox from "../assets/CheckBox.svg?react";

export default function TodoList() {
  const [todoGroups, setTodoGroups] = useState<TodoGroup[]>(initialTodoGroups);

  const handleCheckToggle = (groupId: number, todoId: number) => {
    setTodoGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id !== groupId) {
          return group;
        }
        return {
          ...group,
          todos: group.todos.map((todo) => {
            if (todo.id !== todoId) {
              return todo;
            }
            return { ...todo, isChecked: !todo.isChecked };
          }),
        };
      })
    );
  };

  return (
    <section className="bg-white rounded-xl border-[1.5px] border-main3 p-4">
      <h2 className="text-[18px] font-bold font-black1 mb-4">To-Do</h2>

      {todoGroups.map((group) => (
        <div key={group.id} className="mb-4">
          <span className="inline-block bg-main4 font-black1 text-[12px] font-medium px-2 py-1 rounded-full mb-3">
            {group.groupName}
          </span>

          {group.todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between py-2 cursor-pointer"
              onClick={() => handleCheckToggle(group.id, todo.id)}
            >
              <div className="flex items-center gap-2">
                <CheckBox
                  className={`
                    w-5 h-5 flex-shrink-0 
                    ${todo.isChecked ? "text-[#5E936C]" : "text-[#CAE8BD]"}
                  `}
                />

                <span className="text-[16px] font-medium text-black1">
                  {todo.taskName}
                </span>
              </div>

              <span className="text-[16px] font-semibold text-point">
                {todo.completedCount}/{todo.totalCount}
              </span>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
