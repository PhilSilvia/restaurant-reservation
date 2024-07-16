import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { listTables, seatTable } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';
import { checkForValidTable } from '../validation/validationChecks';

function ReservationSeatingForm({ reservation }){
    const [ selectedTable, setSelectedTable ] = useState('');
    const [ tables, setTables ] = useState([]);
    const [ submissionError, setSubmissionError ] = useState(null);
    const [ tablesError, setTablesError ] = useState(null);
    const navigate = useNavigate();

    function loadTables(){
        const abortController = new AbortController();
        setTablesError(null);
        listTables({}, abortController.signal)
            .then(setTables)
            .catch(setTablesError);
        return () => abortController.abort();
    }

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
            // Build the body of our request from the selected table's data
            const tableData = tables.find((table) => Number(selectedTable) === Number(table.table_id));
            // Change the status of the table and assign it to the reservation's id
            const data = {
                ...tableData,
                status: "Occupied",
                reservation_id: reservation.reservation_id,
            };
            seatTable(data, abortController.signal)
                .then(() => {
                    navigate("/");
                })
                .catch((error) => {
                    setSubmissionError(error)
                });
        }
    }

    function handleCancel(event){
        event.preventDefault();
        navigate("/");
    }

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