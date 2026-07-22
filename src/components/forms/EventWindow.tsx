import { useState, useEffect } from 'react';
import { useUser } from '../../contexts/userContext';
import { IoClose } from 'react-icons/io5';

import './EventWindow.css';

const apiUrl = import.meta.env.VITE_API_URL;

function EventWindow({
  date,
  hidden,
  setHidden,
}: {
  date: Date;
  hidden: boolean;
  setHidden: (value: boolean) => void;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const { user } = useUser();

  useEffect(() => {
    const getDateString = () => {
      const offset = date.getTimezoneOffset();
      const localDate = new Date(date.getTime() - offset * 60000);
      return localDate.toISOString().slice(0, 16);
    };

    const dateString = getDateString();

    setStartTime(dateString);
    setEndTime(dateString);
  }, [date]);

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTitle('');
    setDescription('');
    setHidden(true);
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!user) return;

    const data = {
      userId: user.id,
      title,
      description,
      startTime,
      endTime,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(apiUrl + `/events`, options);
    if (response.ok) {
      const json = await response.json();
      console.log(JSON.stringify(json, null, 2));
    }

    setTitle('');
    setDescription('');
    setHidden(true);
  };

  return (
    <div
      className={
        hidden ? 'event-window__component hide' : 'event-window__component'
      }
    >
      <div className="modal-content">
        <div className="close-button-container">
          <button className="close-button" onClick={handleCancel}>
            <IoClose size={20} color={'gray'} />
          </button>
        </div>
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
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
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
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
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
          <button className="btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-accent" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventWindow;
