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
  // State parameters to track our list of reservations, tables, and their associated errors
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  // Retrieves the query parameters
  const [searchParams] = useSearchParams();
  // Sets the date to the value from the query parameters, or today if none are defined
  const date = searchParams.get('date') || today();
  const navigate = useNavigate();

  // Loads the dashboard based on the date from our query parameter, if any
  useEffect(loadDashboard, [date]);

  // Loads the dashboard's reservations and tables
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
    // Grab the reservation list from the API, setting the error if we fail
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    // Grab the tables list from the API, setting the error if we fail
    listTables({}, abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }

  // Event handler for the "Previous" button
  const previousClickHandler = () => {
    navigate(`/dashboard?date=${previous(date)}`);
  }

  // Event handler for the "Next" button
  const nextClickHandler = () => {
    navigate(`/dashboard?date=${next(date)}`);
  }

  // Event handler for the "Today" button
  const todayClickHandler = () => {
    navigate("/dashboard");
  }

  // Returns the JSX code for the page, which is two lists, the buttons for navigation between dates, and the Error alerts
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