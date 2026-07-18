import type { PlanView } from '../PlanSubpage';

import './PlanStart.css';

function PlanStart({
  setTimerRunning,
  setCurrentView,
}: {
  setTimerRunning: (running: boolean) => void;
  setCurrentView: (view: PlanView) => void;
}) {
  return (
    <div className="plan__start">
      <button
        className="btn btn-accent"
        onClick={() => {
          setTimerRunning(true);
          setCurrentView('start');
        }}
      >
        Start
      </button>
    </div>
  );
}

export default PlanStart;
