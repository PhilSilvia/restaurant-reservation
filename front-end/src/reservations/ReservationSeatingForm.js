import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { listTables, seatReservation } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';
import { checkForValidTable } from '../validation/validationChecks';

/**
 * Defines the JSX for the form that allows a user to seat a particular reservation
 * @param {Object} reservation The reservation being seated 
 * @returns JSX for the element
 */
function ReservationSeatingForm({ reservation }){
    // State variables for tracking the table that's been selected, the tables to be displayed as options, and any errors
    const [ selectedTable, setSelectedTable ] = useState('');
    const [ tables, setTables ] = useState([]);
    const [ submissionError, setSubmissionError ] = useState(null);
    const [ tablesError, setTablesError ] = useState(null);
    const navigate = useNavigate();

    // Function for loading the tables on page load
    function loadTables(){
        const abortController = new AbortController();
        setTablesError(null);
        listTables({}, abortController.signal)
            .then(setTables)
            .catch(setTablesError);
        return () => abortController.abort();
    }

    // Tells the program to load the tables on page load
    useEffect(loadTables, []);

    // Event handler for when the form's values are changed, 
    // so we can track the change in our state variable
    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedTable(value);
    };

    // Submission handler for the form
    function handleSubmission(event){
        event.preventDefault();
        setSubmissionError(null);
        // Ensure that the selected table is a valid choice
        const error = checkForValidTable(selectedTable, tables, reservation);
        // Set the submission error, if there was one
        setSubmissionError(error);
        // If there were no errors, proceed with the submission
        if (!error){
            const abortController = new AbortController();
            setSubmissionError(null);
            // Change the status of the table and assign it to the reservation's id
            seatReservation(reservation.reservation_id, selectedTable, abortController.signal)
                .then(() => navigate("/"))
                .catch(setSubmissionError);
        }
    }

    // Handler for when the cancel button is clicked
    function handleCancel(event){
        event.preventDefault();
        navigate("/");
    }

    // Returns the JSX for the form
    return (
        <div className="col">
            <form onSubmit={handleSubmission}>
                <div className="form-group">
                    <label htmlFor="tableSelector">Choose your table</label>
                    <select name="table_id" className="form-control" id="tableSelector" value={selectedTable} onChange={handleChange} required>
                        <option value="" disabled>Please select a table</option>
                        {tables.map((table) => {
                            return (
                                <option key={table.table_id} value={table.table_id}>
                                    {table.table_name} - {table.capacity}
                                </option>
                            )}
                        )}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="cancel" className="btn btn-danger"onClick={handleCancel}>Cancel</button>
            </form>
            <ErrorAlert error={submissionError} />
            <ErrorAlert error={tablesError} />
        </div>
    );
}

export default ReservationSeatingForm;

//table.capacity >= reservation.people && table.status === "Free" &&