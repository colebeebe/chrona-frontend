import { useState } from 'react';
import { useUser } from '../../contexts/userContext';

import type { EventType } from '../../utils/calendarTypes';

import './EditEvent.css';

const apiUrl = import.meta.env.VITE_API_URL;

type DBEventType = {
  id: number;
  title: string;
  start_datetime: string;
  end_datetime: string;
  description: string;
};

function EditEvent({
  visible,
  setVisible,
  event,
  setEvents,
}: {
  visible: boolean;
  setVisible: (v: boolean) => void;
  event: EventType;
  setEvents: (e: EventType[]) => void;
}) {
  const getDateString = (date: Date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  };

  const { user } = useUser();

  const [title, setTitle] = useState(event.name);
  const [startDate, setStartDate] = useState(getDateString(event.startDate));
  const [endDate, setEndDate] = useState(getDateString(event.endDate));
  const [description, setDescription] = useState(event.notes ?? '');

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(false);
  };

  const getEvents = async () => {
    if (!user) return;
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

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) return;

    const data = {
      title,
      startTime: startDate,
      endTime: endDate,
      description,
    };

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    await fetch(apiUrl + `/events/${event.id}`, options);
    getEvents();

    setVisible(false);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) return;

    const options = {
      method: 'DELETE',
    };

    await fetch(apiUrl + `/events/${event.id}`, options);
    getEvents();

    setVisible(false);
  };

  const stopProp = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={
        visible ? 'edit-event__component' : 'edit-event__component hide'
      }
      onClick={handleClose}
    >
      <div className="edit-event__modal" onClick={stopProp}>
        <h1>Edit Event</h1>
        <input
          name="title"
          id="title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add title"
        />
        <section className="start-date-inputs">
          <label htmlFor="start-date">Start Date: </label>
          <div className="input-container">
            <input
              name="start-date"
              id="start-date"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </section>
        <section className="end-date-inputs">
          <label htmlFor="end-date">End Date: </label>
          <div className="input-container">
            <input
              name="end-date"
              id="end-date"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </section>
        <section className="notes-input">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </section>
        <div className="option-button-container">
          <button className="btn" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn btn-red" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn btn-accent" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditEvent;
