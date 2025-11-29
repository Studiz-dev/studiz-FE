import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockScheduleData } from "../mock/scheduleData";
import type { TimeSlot } from "../types/schedule";

export default function SchedulePage() {
  const navigate = useNavigate();
  const [scheduleData] = useState(mockScheduleData);
  const [hoveredCell, setHoveredCell] = useState<{ date: string; timeSlot: TimeSlot } | null>(null);

  // 셀 색상 계산 - 가능한 멤버 수에 따라 point 컬러 투명도 조절 (0%부터 100%)
  const getCellStyle = (availableCount: number, maxMembers: number) => {
    // 가능한 멤버 수에 따라 투명도 계산 (0명 = 0%, maxMembers명 = 100%)
    if (availableCount === 0) {
      return { backgroundColor: "#ffffff", border: "1px solid #EAEAEA" }; // 0명: 흰색
    }
    
    // 투명도 계산: (availableCount / maxMembers) - 가능한 인원수만큼 투명도 퍼센트 조절
    const opacity = availableCount / maxMembers; // 0.0 ~ 1.0
    
    // point 컬러 (#5E936C)를 rgba로 변환하여 투명도 적용
    return {
      backgroundColor: `rgba(94, 147, 108, ${opacity})`, // #5E936C를 rgba로 변환
    };
  };

  // 표시용: 현재 등록된 멤버 수 / 전체 멤버 수 (6명)
  // 각 셀에서 실제로 등록된 멤버 수를 합산
  const totalRegisteredMembers = scheduleData.cells.reduce((sum, cell) => {
    return sum + (cell.registeredMembers || 0);
  }, 0);
  
  // 진행률 계산: 등록된 멤버 수 / 전체 멤버 수 (6명)
  const progressRatio = scheduleData.maxMembers > 0 ? totalRegisteredMembers / scheduleData.maxMembers : 0;

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* 커스텀 헤더 */}
      <div className="relative flex flex-col items-center justify-center h-[60px] bg-white border-b-[1.5px] border-main4">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-2 p-2"
        >
          <svg className="w-[27px] h-[32px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-sm text-point font-medium">{scheduleData.location}</div>
        <div className="text-lg font-semibold text-black1">{scheduleData.studyName}</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24 relative">
        {/* 시간 등록 현황 */}
        <div className="mb-4">
          <div className="text-sm text-black1 mb-2">
            시간 등록 현황
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-black1">
              0/{scheduleData.maxMembers} 명 가능
            </span>
            {/* 진행률 바 - 가능한 멤버 수에 따라 point 컬러 투명도 조절 (멤버수 + 1개) */}
            <div className="flex-1 flex gap-1">
              {Array.from({ length: scheduleData.maxMembers + 1 }).map((_, index) => {
                // 0명부터 maxMembers명까지 (maxMembers + 1)칸: index는 0~maxMembers
                // 각 세그먼트는 index / maxMembers 비율까지 채워져야 함
                const segmentThreshold = index / scheduleData.maxMembers;
                const isFilled = progressRatio >= segmentThreshold;
                
                // 각 세그먼트의 투명도 계산: index / (maxMembers + 1)로 단계로 나눔
                const segmentOpacity = index / (scheduleData.maxMembers + 1);
                
                return (
                  <div
                    key={index}
                    className="flex-1 h-2 rounded border border-gray-200"
                    style={{
                      backgroundColor: isFilled
                        ? `rgba(94, 147, 108, ${segmentOpacity})` // point 컬러 (#5E936C) 투명도 적용
                        : "#EAEAEA", // 채워지지 않은 경우 회색
                    }}
                  />
                );
              })}
            </div>
            <span className="text-sm text-black1">
              {scheduleData.maxMembers}/{scheduleData.maxMembers} 명 가능
            </span>
          </div>
        </div>

        {/* 스케줄 그리드 */}
        <div className="overflow-x-auto relative">
          <div className="inline-block min-w-full">
            <table className="w-full border-collapse">
              {/* 헤더 행 */}
              <thead>
                <tr>
                  <th className="w-12 p-1 text-[10px] text-gray4 border border-gray1 bg-gray-50"></th>
                  {scheduleData.dates.map((date) => (
                    <th
                      key={date}
                      className="w-10 p-1 text-[10px] text-gray4 border border-gray1 bg-gray-50 text-center"
                    >
                      {date}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scheduleData.timeSlots.map((timeSlot) => (
                  <tr key={`${timeSlot.hour}-${timeSlot.minute}`}>
                    {/* 시간 라벨 */}
                    <td className="p-1 text-[10px] text-gray4 border border-gray1 bg-gray-50 text-center">
                      {String(timeSlot.hour).padStart(2, "0")}:{String(timeSlot.minute).padStart(2, "0")}
                    </td>
                    {/* 각 날짜의 셀 */}
                    {scheduleData.dates.map((date) => {
                      const cell = scheduleData.cells.find(
                        (c) =>
                          c.date === date &&
                          c.timeSlot.hour === timeSlot.hour &&
                          c.timeSlot.minute === timeSlot.minute
                      );
                      if (!cell) return <td key={date} className="p-0.5 border border-gray1"></td>;
                      
                      const availableCount = cell.availableMembers?.length || 0;
                      const cellStyle = getCellStyle(availableCount, cell.maxMembers);
                      
                      return (
                        <td
                          key={date}
                          className="p-0.5 border border-gray1 cursor-pointer relative"
                          style={cellStyle}
                          onMouseEnter={() => setHoveredCell({ date, timeSlot })}
                          onMouseLeave={() => setHoveredCell(null)}
                        />
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 가능/불가능 정보 - 시간표 아래 고정 (항상 공간 차지) */}
        <div className="mt-4 mb-4">
          {hoveredCell ? (() => {
            const cell = scheduleData.cells.find(
              (c) =>
                c.date === hoveredCell.date &&
                c.timeSlot.hour === hoveredCell.timeSlot.hour &&
                c.timeSlot.minute === hoveredCell.timeSlot.minute
            );
            
            if (!cell) return null;
            
            const availableCount = cell.availableMembers?.length || 0;
            const dateParts = hoveredCell.date.split(" ");
            const dateNum = dateParts[0].split("/")[0]; // "9"
            const dayOfWeek = dateParts[1]; // "월"
            const ampm = hoveredCell.timeSlot.hour < 12 ? "오전" : "오후";
            const displayHour = hoveredCell.timeSlot.hour === 0 ? 12 : hoveredCell.timeSlot.hour > 12 ? hoveredCell.timeSlot.hour - 12 : hoveredCell.timeSlot.hour;
            
            return (
              <div className="bg-white rounded-lg border border-gray1 p-4 relative">
                {/* 위쪽 연한 녹색 줄 */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#CAE8BD] rounded-t-lg"></div>
                <div className="text-base font-semibold text-black1 mb-2 mt-1">
                  {availableCount}/{cell.maxMembers}명 가능
                </div>
                <div className="text-xs text-gray4 mb-4">
                  2025년 9월 {dateNum}일 ({dayOfWeek}) {ampm} {displayHour}:{String(hoveredCell.timeSlot.minute).padStart(2, "0")}
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="text-xs text-gray4 mb-2">가능</div>
                    <div className="flex flex-col gap-1 min-h-[120px]">
                      {cell.availableMembers && cell.availableMembers.length > 0 ? (
                        cell.availableMembers.map((member) => (
                          <div key={member.id} className="text-sm text-black1">
                            {member.name}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray3">없음</div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray4 mb-2">불가능</div>
                    <div className="flex flex-col gap-1 min-h-[120px]">
                      {cell.unavailableMembers && cell.unavailableMembers.length > 0 ? (
                        cell.unavailableMembers.map((member) => (
                          <div key={member.id} className="text-sm text-black1">
                            {member.name}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray3">없음</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })() : (
            <div className="bg-white rounded-lg border border-gray1 p-4 relative">
              {/* 위쪽 연한 녹색 줄 */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#CAE8BD] rounded-t-lg"></div>
              <div className="flex gap-4 mt-1">
                <div className="flex-1">
                  <div className="text-xs text-gray4 mb-2">가능</div>
                  <div className="flex flex-col gap-1 min-h-[120px]">
                    {/* 빈 공간 */}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray4 mb-2">불가능</div>
                  <div className="flex flex-col gap-1 min-h-[120px]">
                    {/* 빈 공간 */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 border-t border-gray1 z-50 max-w-[390px] mx-auto">
        <button
          type="button"
          onClick={() => navigate("/ScheduleEdit")}
          className="w-full h-12 rounded-lg bg-point text-white text-base font-semibold hover:bg-[#4C6953] transition"
        >
          시간 등록/수정하기
        </button>
      </div>
    </div>
  );
}

