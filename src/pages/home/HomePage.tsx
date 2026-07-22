import { useState, useEffect } from 'react';
import { useUser } from '../../contexts/userContext';

import type { EventType } from '../../utils/calendarTypes';

import './HomePage.css';
import { sameDay } from '../../utils/calendarCalculations';

type DBEventType = {
  id: number;
  title: string;
  start_datetime: string;
  end_datetime: string;
  description: string;
};

const apiUrl = import.meta.env.VITE_API_URL;

function Home() {
  const [events, setEvents] = useState<EventType[]>([]);
  const { user } = useUser();

  const today = new Date();
  const oneWeek = new Date(today);
  oneWeek.setDate(today.getDate() + 7);

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

  return (
    <div className="home__page">
      <title>Chrona | Home</title>
      <h1>{user ? `Welcome back, ${user.firstName}` : 'Welcome to Chrona.'}</h1>
      {user ? (
        <div className="user-metrics">
          <div className="today-events event-section">
            <h2>Today's Tasks</h2>
            <ul>
              {events
                .filter((event) => {
                  return sameDay(event.startDate, today);
                })
                .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
                .map((event, i) => (
                  <li key={i}>
                    <span>{event.name}</span>
                    <span>
                      {event.startDate.toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="upcoming-events event-section">
            <h2>Upcoming Events</h2>
            <ul>
              {events
                .filter((event) => {
                  return event.startDate > today && event.startDate <= oneWeek;
                })
                .map((event, i) => (
                  <li key={i}>
                    <span>{event.name}</span>
                    <span>
                      {event.startDate.toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Log in to view metrics</p>
      )}
    </div>
  );
}

export default Home;
