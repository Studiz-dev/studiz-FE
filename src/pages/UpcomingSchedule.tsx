// (경로가 ./dummyData.ts가 맞는지 확인해주세요)
import { upcomingSchedules } from './DummyData';

export default function UpcomingSchedule() {
  return (
    // 3. '다가오는 일정' 제목과 상단 여백 조절 (pt-6 px-4 pb-4)
    <section className="bg-white rounded-xl shadow-md pt-6 px-4 pb-4">
      {/* 3. 항목과의 공백(margin-bottom) 조절 (mb-2) */}
      <h2 className="text-lg font-bold mb-2">다가오는 일정</h2>

      {upcomingSchedules.map((item, index) => (
        <div
          key={item.id}
          className={`flex items-center justify-between py-3 ${
            index < upcomingSchedules.length - 1 ? 'border-b border-gray-100' : ''
          }`}
        >
          <div>
            {/* 2. '스터디 그룹명' 색상 변경 (text-[#5E936C]) */}
            <span className="text-xs text-[#5E936C]">{item.groupName}</span>
            <h3 className="text-md font-semibold text-gray-800">{item.studyName}</h3>
            <p className="text-sm text-gray-600">{item.dateTime}</p>
          </div>
          <div>
            <span className="text-lg font-bold text-[#5E936C]">{item.dDay}</span>
          </div>
        </div>
      ))}
    </section>
  );
}