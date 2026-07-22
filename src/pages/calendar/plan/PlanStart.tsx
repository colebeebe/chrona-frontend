import type { PlanView } from '../PlanSubpage';

import './PlanStart.css';

function PlanStart({
  setTimerRunning,
  setCurrentView,
  setCurrentTitle,
}: {
  setTimerRunning: (running: boolean) => void;
  setCurrentView: (view: PlanView) => void;
  setCurrentTitle: (title: string) => void;
}) {
  setCurrentTitle("Let's get Planning!");

  return (
    <div className="plan__start">
      <button
        className="btn btn-accent"
        onClick={() => {
          setTimerRunning(true);
          setCurrentView('reflect');
        }}
      >
        Start
      </button>
    </div>
  );
}

export default PlanStart;
