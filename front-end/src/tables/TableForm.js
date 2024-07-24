import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTable } from "../utils/api";
import { checkForValidTableData } from "../validation/validationChecks";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the JSX for the form used to create new tables in the system
 * @returns JSX for the element
 */
function TableForm(){
    // State variables to track the form data and any submission errors
    const [formData, setFormData] = useState({
        table_name: "",
        capacity: "",
        status: "Free",
    });
    const [ submissionError, setSubmissionError ] = useState(null);
    const navigate = useNavigate();

    // Event handler for when the form's values are changed, 
    // so we can track the change in our state variable
    const handleChange = ({ target }) => {
        const value = target.value;
        setFormData({ ...formData, [target.name]: value });
    };

    // Submission handler
    function handleSubmission(event){
        event.preventDefault();
        setSubmissionError(null);
        // Check for valid table data and show an error if something is off
        const error = checkForValidTableData(formData);
        setSubmissionError(error)
        // If we have no errors, we proceed with the submission
        if (!error){
            const abortController = new AbortController();
            setSubmissionError(null);
            // Ensures the 'capacity' value is a number
            const data = {...formData, "capacity": Number(formData.capacity)};
            // Submit the reservation data to the back-end
            createTable(data, abortController.signal)
                .then(() => {
                    navigate("/")
                })
                .catch((error) => {
                    setSubmissionError(error);
                });
        }
    }

    // Event handler for the cancel button
    function handleCancel(event){
        event.preventDefault();
        // Navigate back one page
        navigate(-1);
    }

    // Returns the JSX for the element, which is mostly a form
    return (
        <div className="col">
            <form onSubmit={handleSubmission}>
                <div className="form-group">
                    <label htmlFor="table-name">
                        Table name
                        <input 
                            type="text"
                            className="form-control" 
                            name="table_name" 
                            id="table_name" 
                            onChange={handleChange} 
                            value={formData.table_name}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="capacity">
                        Seating capacity
                        <input 
                            type="number"
                            className="form-control" 
                            name="capacity" 
                            id="capacity" 
                            onChange={handleChange} 
                            value={formData.capacity}
                        />
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="cancel" className="btn btn-danger"onClick={handleCancel}>Cancel</button>
            </form>
            <ErrorAlert error={submissionError} />
        </div>
    );
}

export default TableForm;