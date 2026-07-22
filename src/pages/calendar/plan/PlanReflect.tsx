import { sameDay } from '../../../utils/calendarCalculations';

import type { EventType } from '../../../utils/calendarTypes';
import type { PlanView } from '../PlanSubpage';

import './PlanReflect.css';

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

function PlanReflect({
  setTimerRunning,
  setCurrentView,
  setCurrentTitle,
  events,
}: {
  setTimerRunning: (value: boolean) => void;
  setCurrentView: (value: PlanView) => void;
  setCurrentTitle: (title: string) => void;
  events: EventType[];
}) {
  setCurrentTitle('Take a Moment to Reflect');

  const lastWeek: Date[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    lastWeek.push(date);
  }

  const handleCancel = () => {
    setTimerRunning(false);
    setCurrentView('start');
  };

  return (
    <div className="plan__reflect">
      <h2>Events from Last Week:</h2>
      <div className="week-container">
        {lastWeek.map((day) => {
          const dayEvents = events.filter((event) =>
            sameDay(event.startDate, day),
          );

          return (
            <div key={day.toLocaleDateString()} className="day-container">
              <p>{dayNames[day.getDay()]}</p>
              <p className="day-number">{day.getDate()}</p>

              {dayEvents.map((event) => (
                <div key={event.id} className="event-block">
                  <span>{event.name}</span>
                  <span>
                    {event.startDate.toLocaleTimeString([], {
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="btn-container">
        <button className="btn" onClick={handleCancel}>
          Cancel
        </button>
        <button
          className="btn btn-accent"
          onClick={() => setCurrentView('major')}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PlanReflect;
