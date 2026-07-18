import { useState } from 'react';

import PlanStart from './plan/PlanStart';

import './PlanSubpage.css';
import Timer from '../../components/Timer';

export type PlanView = 'start';

function PlanSubpage() {
  const [currentView, setCurrentView] = useState<PlanView>('start');
  const [timerRunning, setTimerRunning] = useState(false);

  const viewComponents = {
    start: PlanStart,
  };

  const ActiveView = viewComponents[currentView];

  return (
    <div className="plan__subpage">
      <h1>Let's get Planning!</h1>
      <Timer running={timerRunning} />
      <ActiveView
        setTimerRunning={setTimerRunning}
        setCurrentView={setCurrentView}
      />
    </div>
  );
}

export default PlanSubpage;
