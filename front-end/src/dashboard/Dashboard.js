import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ReservationList from "../reservations/ReservationList";
import ErrorAlert from "../layout/ErrorAlert";
import { useNavigate, useSearchParams } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";
import TableList from "../tables/TableList";

/**
 * Defines the dashboard page.
 * 
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  // Retrieves the query parameters
  const [searchParams] = useSearchParams();
  // Sets the date to the value from the query parameters, or today if none are defined
  const date = searchParams.get('date') || today();
  const navigate = useNavigate();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables({}, abortController.signal)
      .then(setTables)
      .catch(setTablesError);
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
      <div className="row">
        <div className="col-6">
          <div className="d-md-flex flex-column mb-3">
            <h4 className="mb-0">Reservations for date {date}</h4>
            <div className="row m-1">
              <button type="button" onClick={previousClickHandler} className="btn btn-primary mx-1" >Previous</button>
              <button type="button" onClick={nextClickHandler} className="btn btn-primary mx-1">Next</button>
              <button type="button" onClick={todayClickHandler} className="btn btn-success mx-1">Today</button>
            </div>
            <ReservationList reservations={reservations}/>
          </div>
        </div>
        <div className="col-6">
          <div className="d-md-flex flex-column mb-3">
            <h4 className="mb-0">Tables</h4>
            <TableList tables={tables}/>
          </div>
        </div>
      </div>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
    </main>
  );
}

export default Dashboard;

// {JSON.stringify(reservations)}