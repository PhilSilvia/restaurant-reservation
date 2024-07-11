import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Reservation form for submitting a new reservation to the restaurant system.
 * @returns React code for displaying the form
 */
function ReservationForm(){
    // State variables for tracking the ongoing form data
    const [ formData, setFormData ] = useState({});
    // Tracks any errors from illegal form submissions
    const [ submissionError, setSubmissionError ] = useState(null);
    const navigate = useNavigate();

    // Checks the data to see if all fields are valid
    // Fields are valid if they are not null
    // The "people" field needs to be greater than 0
    const checkForValidData = (data) => {
        // Map for the variable name to a more user-friendly name
        const fieldMap = new Map([
            ["first_name", "First Name"], 
            ["last_name", "Last Name"], 
            ["mobile_number", "Mobile Phone Number"], 
            ["reservation_date", "Reservation Data"], 
            ["reservation_time", "Reservation Time"], 
            ["people", "Party Size"]]);
        // Array of the fields for easy iterating
        const fields = [...fieldMap.keys()];
        // Go through each field
        for (let i = 0; i < fields.length; i++){
            const field = fields[i];
            // If a field is null, then return an error necessitating that field
            if (!data[field]){
                return new Error(`${fieldMap.get(field)} is required`);
            }
        }
        // If the party size is 0 or fewer, return an error for that, too
        if (Number(data["people"]) <= 0)
            return new Error("Party size must be greater than zero");
    }

    // Event handler for when the form's values are changed, 
    // so we can track the change in our state variable
    const handleChange = ({ target }) => {
        const value = target.value;
        setFormData({ ...formData, [target.name]: value });
    };

    // Submission handler for when the user clicks on the Submit button
    const handleSubmission = (event) => {
        event.preventDefault();
        // Validate the form data, and display an error if something is awry
        setSubmissionError(checkForValidData(formData));
        // If we have no errors, we proceed with the submission
        if (!submissionError){
            // Submit the reservation data to the back-end
            const abortController = new AbortController();
            setSubmissionError(null);
            createReservation(formData, abortController.signal)
                .then(() => {
                    console.log("Attempting to navigate");
                    return navigate(`/reservations?date=${formData.reservation_date}`)
                })
                .catch((error) => setSubmissionError(error));
            //navigate(`/reservations?date=${formData.reservation_date}`)
        }
    };

    // Event handler for when the cancel button is clicked
    // Returns the user back to the Dashboard screen without submitting any data
    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    };

    // Returns the JSX for the form and an error display at the bottom
    return (
        <div className="col">
            <form onSubmit={handleSubmission}>
                <div className="form-group">
                    <label htmlFor="first_name">
                        First Name 
                        <input 
                            type="text" 
                            className="form-control" 
                            name="first_name" 
                            id="first_name" 
                            onChange={handleChange} 
                            value={formData.first_name} 
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">
                        Last Name:
                        <input 
                            type="text" 
                            className="form-control"
                            name="last_name" 
                            id="last_name" 
                            onChange={handleChange} 
                            value={formData.last_name} 
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="mobile_number">
                        Mobile Phone Number:
                        <input 
                            type="text" 
                            className="form-control"
                            name="mobile_number" 
                            id="mobile_number" 
                            onChange={handleChange} 
                            value={formData.mobile_number} 
                        />
                </label>
                </div>
                <div className="form-group">
                    <label htmlFor="reservation_date">
                        Date of Reservation:
                        <input 
                            type="date" 
                            className="form-control"
                            name="reservation_date" 
                            id="reservation_date" 
                            onChange={handleChange} 
                            value={formData.reservation_date} 
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="reservation_time">
                        Time of Reservation:
                        <input 
                            type="time" 
                            className="form-control"
                            name="reservation_time" 
                            id="reservation_time" 
                            onChange={handleChange} 
                            value={formData.reservation_time} 
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="people">
                        People in Party:
                        <input 
                            type="people"
                            className="form-control" 
                            name="people" 
                            id="people" 
                            onChange={handleChange} 
                            value={formData.people} 
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

export default ReservationForm;