import CalendarHeaderCaption from '../CalendarHeaderCaption';

import type { CalendarProps } from '../../../utils/calendarTypes';

import './YearView.css';
import { sameDay } from '../../../utils/calendarCalculations';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

function YearView({
  date,
  setDate,
  setCurrentView,
  events,
  setEvents,
}: CalendarProps) {
  const year = date.getFullYear();

  function getYearMonthDate(year: number, month: number) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: Date[] = [];

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return {
      firstDay,
      days,
    };
  }

  const days: number[] = [];

  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }

  return (
    <div className="year-view__component">
      <CalendarHeaderCaption
        date={date}
        setDate={setDate}
        setCurrentView={setCurrentView}
        navigate={{ next: () => {}, prev: () => {} }}
        events={events}
        setEvents={setEvents}
      >
        {year}
      </CalendarHeaderCaption>
      <div className="calendar-body">
        {months.map((month, i) => {
          const { firstDay, days } = getYearMonthDate(year, i);
          const blanks = Array(firstDay.getDay()).fill(null);

          return (
            <div className="month-container" key={month}>
              <h2>{month}</h2>

              <div className="day-container">
                {blanks.map((_, index) => (
                  <div key={`blank-${index}`} />
                ))}
                {days.map((day) => (
                  <div
                    key={day.toISOString()}
                    className={sameDay(day, new Date()) ? 'current-date' : ''}
                  >
                    {day.getDate()}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default YearView;
