import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found__page">
      <title>Page Not Found</title>
      <img src="/images/404.gif" alt="404 Not Found" />
      <div className="center-link">
        <Link to="/home" className="btn btn-accent">
          Return to homepage
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
