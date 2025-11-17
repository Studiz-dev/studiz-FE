import UpcomingSchedule from "../components/UpcomingSchedule";
import TodoList from "../components/TodoList";

export default function HomePage() {
  return (
    <div className="bg-background p-4">
      <div className="flex flex-col gap-4">
        <UpcomingSchedule />
        <TodoList />
      </div>
    </div>
  );
}
