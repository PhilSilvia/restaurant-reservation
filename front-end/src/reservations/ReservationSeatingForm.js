import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { listTables } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';

function ReservationSeatingForm({ reservation }){
    const [selectedOption, setSelectedOption] = useState('');
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
        console.log(`Selected value: ${event.target.value}`);
        setSelectedOption(value);
    };

    function handleSubmission(event){
        event.preventDefault();
        setSubmissionError(null);
        //const error = checkForValidTableData(formData);
        //setSubmissionError(error)
        // If we have no errors, we proceed with the submission
        //if (!error){
            // Submit the reservation data to the back-end
            const abortController = new AbortController();
            setSubmissionError(null);
            // Ensures the 'capacity' value is a number
            /*const data = {...formData, "capacity": Number(formData.capacity)};
            createTable(data, abortController.signal)
                .then(() => {
                    navigate("/")
                })
                .catch((error) => {
                    setSubmissionError(error);
                });*/
        //}
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
                    <select className="form-control" id="tableSelector" value={selectedOption} onChange={handleChange} required>
                        <option value="" disabled>Please select a table</option>
                        {tables.map((table) => {
                            console.log(`Making option for table id: ${table.table_id}`);
                            return table.capacity >= reservation.people && table.status === "Free" &&  (
                                <option key={table.table_id} value={table.table_id}>
                                    {table.table_name}: Seating for {table.capacity}
                                </option>
                            )}
                        )}
                    </select>
                    <p>Selectioned option: {selectedOption}</p>
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