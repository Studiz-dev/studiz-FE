import { useState } from 'react';
import { todoGroups as initialTodoGroups, type TodoGroup } from './DummyData';

// 1. [변경!] 'src' 폴더에 있는 'CheckBox.svg'를 정확히 import 합니다.
// (pages 폴더에서 src 폴더로 가려면 '..'를 두 번 씁니다)
import CheckBox from '../assets/CheckBox.svg?react'; 

export default function TodoList() {
  const [todoGroups, setTodoGroups] = useState<TodoGroup[]>(initialTodoGroups);

  // (handleCheckToggle 함수는 완벽하므로 그대로 둡니다)
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
    <section className="bg-white rounded-xl shadow-md p-4">
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
                
                {/* --- [핵심 수정!] ---
                  'div'로 감싸던 모든 코드를 삭제하고,
                  'CheckBox' 컴포넌트 하나만 사용합니다.
                */}
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