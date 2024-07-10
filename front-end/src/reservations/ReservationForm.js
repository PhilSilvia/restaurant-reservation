import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
            ["firstName", "First Name"], 
            ["lastName", "Last Name"], 
            ["mobileNumber", "Mobile Phone Number"], 
            ["reservationDate", "Reservation Data"], 
            ["reservationTime", "Reservation Time"], 
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
            navigate(`/dashboard/${formData["reservationDate"]}`);
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
                    <label htmlFor="firstName">
                        First Name 
                        <input 
                            type="text" 
                            className="form-control" 
                            name="firstName" 
                            id="firstName" 
                            onChange={handleChange} 
                            value={formData.firstName} 
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">
                        Last Name:
                        <input 
                            type="text" 
                            className="form-control"
                            name="lastName" 
                            id="lastName" 
                            onChange={handleChange} 
                            value={formData.lastName} 
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="mobileNumber">
                        Mobile Phone Number:
                        <input 
                            type="text" 
                            className="form-control"
                            name="mobileNumber" 
                            id="mobileNumber" 
                            onChange={handleChange} 
                            value={formData.mobileNumber} 
                        />
                </label>
                </div>
                <div className="form-group">
                    <label htmlFor="reservationDate">
                        Date of Reservation:
                        <input 
                            type="date" 
                            className="form-control"
                            name="reservationDate" 
                            id="reservationDate" 
                            onChange={handleChange} 
                            value={formData.reservationDate} 
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="reservationTime">
                        Time of Reservation:
                        <input 
                            type="time" 
                            className="form-control"
                            name="reservationTime" 
                            id="reservationTime" 
                            onChange={handleChange} 
                            value={formData.reservationTime} 
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