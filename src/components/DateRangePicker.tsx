import React, { useState } from 'react';
import Calendar from './Calender';
import './DateRangePicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface DateRangePickerProps {
  maxDays?: number; 
  disablePastDates?: boolean; 
  advancedMode?: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  maxDays = 30,
  disablePastDates = true,
  advancedMode = false,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [excludeWeekends, setExcludeWeekends] = useState<boolean>(false);

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleDateSelect = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (date >= startDate) {
      setEndDate(date);
    }
  };

  return (
    <div className="date-range-picker">
      <div className="navigation">
      <button onClick={handlePrevMonth} className="icon-button">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })} - {new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button onClick={handleNextMonth} className="icon-button">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className="calendar-pane">
        <Calendar
          monthOffset={0}
          currentDate={currentDate}
          startDate={startDate}
          endDate={endDate}
          onDateSelect={handleDateSelect}
          disablePastDates={disablePastDates}
          maxDays={maxDays}
          excludeWeekends={excludeWeekends}
        />
        <Calendar
          monthOffset={1}
          currentDate={currentDate}
          startDate={startDate}
          endDate={endDate}
          onDateSelect={handleDateSelect}
          disablePastDates={disablePastDates}
          maxDays={maxDays}
          excludeWeekends={excludeWeekends}
        />
      </div>

      {advancedMode && (
        <div>
          <label>
            Exclude Weekends
            <input type="checkbox" checked={excludeWeekends} onClick={() => setExcludeWeekends(!excludeWeekends)}/>
          </label>
          {/* Add more advanced options as needed */}
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
