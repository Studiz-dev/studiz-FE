import { upcomingSchedules } from '../pages/DummyData'; 

export default function UpcomingSchedule() {
  return (
    <section className="bg-white rounded-xl border-[1.5px] border-main3 pt-6 px-4 pb-4">
      <h2 className="text-[18px] font-bold mb-2 text-black1">다가오는 일정</h2>

      {upcomingSchedules.map((item, index) => (
        <div
          key={item.id}
          className={`flex items-center justify-between py-3 ${
            index < upcomingSchedules.length - 1 ? 'border-b border-main4' : ''
          }`}
        >
          <div>
            <span className="text-[14px] font-semibold text-point block mb-[2px]">{item.groupName}</span>
            <h3 className="text-[18px] font-semibold text-black1 mb-[4px]">{item.studyName}</h3>
            <p className="text-[12px] font-medium text-gray4">{item.dateTime}</p>
          </div>
          <div>
            <span className="text-[18px] font-semibold text-point">{item.dDay}</span>
          </div>
        </div>
      ))}
    </section>
  );
}