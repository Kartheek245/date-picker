import React from 'react';
import './Calender.css';

interface CalendarProps {
  monthOffset: number;
  currentDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  onDateSelect: (date: Date) => void;
  disablePastDates?: boolean;
  maxDays?: number;
  excludeWeekends?:boolean;
}

const Calendar: React.FC<CalendarProps> = ({
  monthOffset,
  currentDate,
  startDate,
  endDate,
  onDateSelect,
  disablePastDates = false,
  maxDays = 30,
  excludeWeekends = false
}) => {
  const displayedMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, 1);
  const daysInMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => new Date(displayedMonth.getFullYear(), displayedMonth.getMonth(), i + 1));
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const handleClick = (day: Date) => {
    if (isDisabled(day)) return;
    onDateSelect(day);
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isDisabled = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (disablePastDates && day < today) return true;

    if(excludeWeekends && isWeekend(day)) return true;

    if (startDate && endDate) return false;
    
    if (startDate && maxDays) {
      const rangeLimit = new Date(startDate);
      rangeLimit.setDate(startDate.getDate() + maxDays);
      return day > rangeLimit;
    }

    return false;
  };

  const isInRange = (day: Date) => {
    if (startDate && endDate) {
      return day >= startDate && day <= endDate;
    }
    return false;
  };



  return (
    <div className="calendar">
      <div className="calendar-day-labels">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="calendar-day-label">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-grid">
      {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={index} className="calendar-day empty"></div>
        ))}
        {days.map((day) => (
          <button
            key={day.toISOString()}
            className={`calendar-day ${isInRange(day) ? 'in-range' : ''} ${isDisabled(day) ? 'disabled' : ''}`}
            onClick={() => handleClick(day)}
            disabled={isDisabled(day)}
          >
            {day.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
