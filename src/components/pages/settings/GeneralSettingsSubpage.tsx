import { useTheme } from '../../../contexts/themeContext';

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

function GeneralSettingsSubpage() {
  const { theme, setTheme } = useTheme();

  const lightTheme = () => {
    setTheme({ mode: 'light', accent: theme ? theme.accent : 'green' });
  };

  const darkTheme = () => {
    setTheme({ mode: 'dark', accent: theme ? theme.accent : 'green' });
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
          {/* TODO: Create these dynamically so that the selected accent can update */}
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
    </div>
  );
}

export default GeneralSettingsSubpage;
