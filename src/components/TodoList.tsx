import { useState } from 'react';
// [경로 유지!] ../pages/DummyData
import { todoGroups as initialTodoGroups, type TodoGroup } from '../pages/DummyData';

// [경로 유지!] ../assets/CheckBox.svg?react
import CheckBox from '../assets/CheckBox.svg?react'; 

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
    // [수정!]
    // 'shadow-md' 삭제
    // 'border-[1.5px] border-[#DDF6D2]' (요청하신 색상) 추가
    <section className="bg-white rounded-xl border-[1.5px] border-[#DDF6D2] p-4">
      <h2 className="text-lg font-bold mb-4">To-Do</h2>

      {todoGroups.map((group) => (
        <div key={group.id} className="mb-4">
          <span className="inline-block bg-[#F0F8E8] text-[#5E936C] text-xs font-semibold px-2 py-1 rounded-full mb-3">
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
                    ${todo.isChecked ? 'text-[#5E936C]' : 'text-[#CAE8BD]'}
                  `}
                />

                <span className="text-gray-800">{todo.taskName}</span>
              </div>
              
              <span className="text-sm font-semibold text-[#5E936C]">
                {todo.completedCount}/{todo.totalCount}
              </span>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}