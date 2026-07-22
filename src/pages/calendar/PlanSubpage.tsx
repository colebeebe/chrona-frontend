import { useState, useEffect } from 'react';
import { useUser } from '../../contexts/userContext';

import PlanStart from './plan/PlanStart';
import PlanReflect from './plan/PlanReflect';
import PlanMajor from './plan/PlanMajor';
import PlanMinor from './plan/PlanMinor';

import Timer from '../../components/Timer';

import type { EventType } from '../../utils/calendarTypes';

import './PlanSubpage.css';

export type PlanView = 'start' | 'reflect' | 'major' | 'minor';

type DBEventType = {
  id: number;
  title: string;
  start_datetime: string;
  end_datetime: string;
  description: string;
};

const apiUrl = import.meta.env.VITE_API_URL;

function PlanSubpage() {
  const [currentView, setCurrentView] = useState<PlanView>('start');
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');

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

      const today = new Date();
      const start = new Date(today);
      start.setDate(today.getDate() - 7);

      const end = new Date(today);
      end.setDate(today.getDate() + 7);

      const range = formattedData.filter((event: EventType) => {
        return event.startDate >= start && event.startDate <= end;
      });

      setEvents(range);
    };

    getEvents();
  }, [user]);

  const viewComponents = {
    start: PlanStart,
    reflect: PlanReflect,
    major: PlanMajor,
    minor: PlanMinor,
  };

  const ActiveView = viewComponents[currentView];

  return (
    <div className="plan__subpage">
      <h1>{currentTitle}</h1>
      <Timer running={timerRunning} />
      <ActiveView
        setTimerRunning={setTimerRunning}
        setCurrentView={setCurrentView}
        setCurrentTitle={setCurrentTitle}
        events={events}
      />
    </div>
  );
}

export default PlanSubpage;
