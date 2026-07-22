import { useState, useEffect } from 'react';
import YearView from '../../components/calendars/YearView/YearView';
import MonthView from '../../components/calendars/MonthView/MonthView';
import WeekView from '../../components/calendars/WeekView/WeekView';
import { useUser } from '../../contexts/userContext';

import type { CalendarView } from '../../utils/calendarTypes';
import type { EventType } from '../../utils/calendarTypes';

import './EventsSubpage.css';

const apiUrl = import.meta.env.VITE_API_URL;

type DBEventType = {
  id: number;
  title: string;
  start_datetime: string;
  end_datetime: string;
  description: string;
};

function EventsSubpage() {
  const [currentView, setCurrentView] = useState<CalendarView>('month');
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<EventType[]>([]);

  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const getEvents = async () => {
      const response = await fetch(apiUrl + `/users/${user.id}/events`);
      const data = await response.json();
      const formattedData = data.map((event: DBEventType) => ({
        id: event.id,
        name: event.title,
        startDate: new Date(event.start_datetime),
        endDate: new Date(event.end_datetime),
        notes: event.description,
      }));
      setEvents(formattedData);
    };

    getEvents();
  }, [user]);

  const viewComponents = {
    year: YearView,
    month: MonthView,
    week: WeekView,
    day: MonthView,
  };

  const ActiveView = viewComponents[currentView];

  return (
    <div className="events__subpage">
      <title>Chrona | Events</title>
      <div className="calendar">
        <ActiveView
          date={date}
          setDate={setDate}
          setCurrentView={setCurrentView}
          navigate={{ next: () => {}, prev: () => {} }}
          events={events}
          setEvents={setEvents}
        >
          <></>
        </ActiveView>
      </div>
    </div>
  );
}

export default EventsSubpage;
