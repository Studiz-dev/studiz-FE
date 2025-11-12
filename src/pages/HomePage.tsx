import UpcomingSchedule from '../components/UpcomingSchedule'; 
import TodoList from '../components/TodoList';

export default function HomePage() {
  return (
    // [핵심 수정!]
    // 'min-h-screen' 클래스를 반드시 제거해야
    // App.tsx의 'overflow-y-auto' 스크롤이 정상 작동합니다.
    <div className="bg-[#F9FFF6] p-4">
      
      {/* 이 부분은 완벽합니다. */}
      <div className="flex flex-col gap-4">
        <UpcomingSchedule />
        <TodoList />
      </div>

    </div>
  );
}