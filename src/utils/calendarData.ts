import { sameDay } from './calendarCalculations';
import type { EventType } from '../utils/calendarTypes';

type DateObjectType = {
  date: Date;
  events?: EventType[];
};

export function getMonthData(date: Date, events: EventType[]) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const start = new Date(year, month, 1);
  const dayOfWeek = start.getDay();
  start.setDate(start.getDate() - dayOfWeek);

  const days: DateObjectType[] = [];

  // TODO: Create wrapping logic here
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const dayEvents = events
      .filter((e) => sameDay(e.startDate, d))
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
      .map((event, index) => ({
        ...event,
        stack: index,
      }));
    days.push({ date: d, events: dayEvents });
  }

  return days;
}

export function getWeekData(date: Date, events: EventType[]) {
  const start = new Date(date);
  const dayOfWeek = start.getDay();
  start.setDate(start.getDate() - dayOfWeek);

  const days: DateObjectType[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const dayEvents = events.filter((e) => sameDay(e.startDate, d));
    days.push({ date: d, events: dayEvents });
  }

  return days;
}
