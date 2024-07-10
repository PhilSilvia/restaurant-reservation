import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useSearchParams } from "react-router-dom";
import { today } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * 
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date') || today();
  console.log(date);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
