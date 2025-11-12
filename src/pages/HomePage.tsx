import UpcomingSchedule from './UpcomingSchedule';
import TodoList from './TodoList';

export default function HomePage() {
  return (
    // 연두색 배경(#F9FFF6)과 패딩(p-4) 적용
    <div className="min-h-screen bg-[#F9FFF6] p-4">
      
      {/* 두 컴포넌트를 수직(flex-col)으로 간격(gap-4)을 두고 배치 */}
      <div className="flex flex-col gap-4">
        
        <UpcomingSchedule />
        
        <TodoList />

      </div>
    </div>
  );
}