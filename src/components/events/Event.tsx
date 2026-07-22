import { useState } from 'react';
import { daysBetween } from '../../utils/calendarCalculations';
import EditEvent from './EditEvent';

import type { EventType } from '../../utils/calendarTypes';

import './Event.css';

type EventProps = {
  event: EventType;
  stack: number;
  setEvents: (e: EventType[]) => void;
};

function Event({ event, stack, setEvents }: EventProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const numDays = daysBetween(event.startDate, event.endDate);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalVisible(true);
  };

  // function formatTime(startDate: Date, endDate: Date) {
  //   const formatTime = (date: Date) =>
  //     date.toLocaleTimeString([], {
  //       hour: 'numeric',
  //       minute: '2-digit',
  //     });

  //   const start = formatTime(startDate);
  //   const end = formatTime(endDate);

  //   if (startDate.getTime() === endDate.getTime()) {
  //     return start;
  //   }

  //   return `${start} - ${end}`;
  // }

  return (
    <>
      <div
        className="event__component"
        style={{
          width: `calc((var(--calendar__subpage__width) - 32px) / 7 * ${numDays} - 15px)`,
          backgroundColor: `var(--yellow)`,
          marginTop: `${stack * 24 + 2}px`,
        }}
        onClick={handleClick}
      >
        <span>{event.name}</span>
        <span style={{ color: '#666' }}>
          {event.startDate.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
          })}
        </span>
      </div>
      <EditEvent
        visible={modalVisible}
        setVisible={setModalVisible}
        event={event}
        setEvents={setEvents}
      />
    </>
  );
}

export default Event;
