import TodoItem from "./ToDoItem";
// import { todoGroups } from "../mock/scheduleTodoData"; // Remove mock data import
import { useNavigate } from "react-router-dom";
import Plus from "../assets/plus.svg?react";
import type { TodoGroup } from "../types/todo"; // Import TodoGroup type

// Add a type for the component props
interface TodoListProps {
  studyId: string;
  isLeader: boolean;
  todos: TodoGroup[]; // Accept grouped todos as prop
}

export default function TodoList({ studyId, isLeader, todos }: TodoListProps) { // Destructure todos from props
  const navigate = useNavigate();

  // If no todos, display a message
  if (todos.length === 0) {
    return (
      <section className="bg-white rounded-[20px] border-[1.5px] border-main3 pt-5 px-5 pb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-[18px] font-bold mb-2 text-black1">To-Do</h1>
          {isLeader && (<button onClick={() => navigate("/CreateToDo", { state: { studyId } })} className="px-2 py-1 bg-main4 rounded-[12px] items-center flex gap-1">
            <Plus className="text-point" />
            <span className="text-point text-[14px] font-medium translate-y-[1px] ">새로운 To-Do</span>
          </button>)}
        </div>
        <p className="text-gray-500 text-center py-4">아직 To-Do가 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-[20px] border-[1.5px] border-main3 pt-5 px-5 pb-2">
      <div className="flex items-center justify-between">
        <h1 className="text-[18px] font-bold mb-2 text-black1">To-Do</h1>
        {isLeader && (<button onClick={() => navigate("/CreateToDo", { state: { studyId } })} className="px-2 py-1 bg-main4 rounded-[12px] items-center flex gap-1">
          <Plus className="text-point" />
          <span className="text-point text-[14px] font-medium translate-y-[1px] ">새로운 To-Do</span>
        </button>)}
      </div>

      {todos.map((group) => ( // Use todos prop instead of todoGroups mock data
        <div key={group.id} className="space-y-1 pb-2">
          <span className="inline-block px-2 py-1 bg-main4 font-black1 text-[12px] font-medium rounded-[20px]">
            {group.groupName}
          </span>
          {group.todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              taskName={todo.name} // Use todo.name from API
              completedCount={todo.completedParticipants} // Use todo.completedParticipants
              totalCount={todo.totalParticipants} // Use todo.totalParticipants
              isChecked={todo.isCompleted} // Use todo.isCompleted
              isLast={index === group.todos.length - 1}
              path={`/todo/${todo.id}`}
            />
          ))}
        </div>
      ))}
    </section>
  );
}
