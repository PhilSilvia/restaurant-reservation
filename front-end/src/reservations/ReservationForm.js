import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { checkForValidData } from "../validation/validationChecks";

/**
 * Reservation form for submitting a new reservation to the restaurant system.
 * @returns React code for displaying the form
 */
function ReservationForm(){
    // State variables for tracking the ongoing form data
    const [ formData, setFormData ] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    });
    // Tracks any errors from illegal form submissions
    const [ submissionError, setSubmissionError ] = useState(null);
    const navigate = useNavigate();

    // Event handler for when the form's values are changed, 
    // so we can track the change in our state variable
    const handleChange = ({ target }) => {
        const value = target.value;
        setFormData({ ...formData, [target.name]: value });
    };

    // Submission handler for when the user clicks on the Submit button
    const handleSubmission = (event) => {
        event.preventDefault();
        setSubmissionError(null);
        // Validate the form data, and display an error if something is awry
        const error = checkForValidData(formData);
        setSubmissionError(error);
        // If we have no errors, we proceed with the submission
        if (!error){
            // Submit the reservation data to the back-end
            const abortController = new AbortController();
            setSubmissionError(null);
            // Ensures the 'people' value is a number
            const data = {...formData, "people": Number(formData.people)};
            createReservation(data, abortController.signal)
                .then(() => {
                    const path = `/dashboard?date=${formData.reservation_date}`;
                    return navigate(path);
                })
               .catch((error) => {
                    setSubmissionError(error);
               });
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