import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useNavigate, useSearchParams } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * 
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  // Retrieves the query parameters
  const [searchParams] = useSearchParams();
  // Sets the date to the value from the query parameters, or today if none are defined
  const date = searchParams.get('date') || today();
  const navigate = useNavigate();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const previousClickHandler = () => {
    navigate(`/dashboard?date=${previous(date)}`);
  }

  const nextClickHandler = () => {
    navigate(`/dashboard?date=${next(date)}`);
  }

  const todayClickHandler = () => {
    navigate("/dashboard");
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="col">
        <div className="d-md-flex flex-column mb-3">
          <h4 className="mb-0">Reservations for date {date}</h4>
          {JSON.stringify(reservations)}
        </div>
        <button type="button" onClick={previousClickHandler} className="btn btn-primary" >Previous</button>
        <button type="button" onClick={nextClickHandler} className="btn btn-primary">Next</button>
        <button type="button" onClick={todayClickHandler} className="btn btn-success">Today</button>
      </div>
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;
