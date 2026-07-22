import { sameDay } from '../../../utils/calendarCalculations';

import type { EventType } from '../../../utils/calendarTypes';
import type { PlanView } from '../PlanSubpage';

import './PlanMinor.css';

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

function PlanMinor({
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
  setCurrentTitle('Shoot for the stars!');

  const nextWeek: Date[] = [];
  const today = new Date();

  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    nextWeek.push(date);
  }

  const handleCancel = () => {
    setTimerRunning(false);
    setCurrentView('start');
  };

  return (
    <div className="plan__major">
      <div className="header-info">
        <h2>Plan out some smaller goals</h2>
        <button className="btn btn-accent">+</button>
      </div>
      <div className="week-container">
        {nextWeek.map((day) => {
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
          Previous
        </button>
        <button
          className="btn btn-accent"
          onClick={() => setCurrentView('start')}
        >
          Finish
        </button>
      </div>
    </div>
  );
}

export default PlanMinor;
