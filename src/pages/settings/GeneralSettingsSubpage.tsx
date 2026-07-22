import { useUser } from '../../contexts/userContext';
import { useTheme } from '../../contexts/themeContext';

import './GeneralSettingsSubpage.css';

const colorThemes = [
  'pink',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
] as const;

const apiUrl = import.meta.env.VITE_API_URL;

function GeneralSettingsSubpage() {
  const { theme, setTheme } = useTheme();
  const { user } = useUser();

  const lightTheme = () => {
    setTheme({ mode: 'light', accent: theme ? theme.accent : 'green' });
  };

  const darkTheme = () => {
    setTheme({ mode: 'dark', accent: theme ? theme.accent : 'green' });
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!user) return;

    // Some options are always set the same since the database supports them
    // but the frontend does not yet
    const data = {
      timeZone: 'America/New York',
      weekStartDay: 'Sunday',
      theme: theme ? theme.mode : 'light',
      accent: theme ? theme.accent : 'green',
    };

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      apiUrl + `/users/${user.id}/settings`,
      options,
    );

    if (!response.ok) {
      const error = await response.text();
      console.error(error);
    }
  };

  return (
    <div className="general-settings__subpage">
      <h1>Settings</h1>
      <title>Chrona | General Settings</title>
      <section className="theme-section major-section">
        <h2>Aesthetics</h2>
        <div className="light-dark-theme minor-section">
          <h3>Theme</h3>
          <div className="theme-button-container">
            <button className="btn" onClick={lightTheme}>
              Light
            </button>
            <button className="btn" onClick={darkTheme}>
              Dark
            </button>
          </div>
        </div>
        <div className="accent-color-theme minor-section">
          <h3>Accent Color</h3>
          <div className="accent-color-container">
            {colorThemes.map((color, i) => (
              <button
                className={[
                  `accent-color-${color}`,
                  color === theme?.accent ? 'selected-accent' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() =>
                  setTheme({
                    accent: color,
                    mode: theme ? theme.mode : 'system',
                  })
                }
                key={i}
              ></button>
            ))}
          </div>
        </div>
      </section>
      <div className="save-btn-container">
        <button
          className="btn btn-accent"
          id="save-settings-btn"
          onClick={(e) => handleSave(e)}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default GeneralSettingsSubpage;
