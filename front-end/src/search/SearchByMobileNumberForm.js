import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { searchReservationByMobileNumber } from "../utils/api";

/**
 * Defines the JSX for the Search by Mobile Number form. Loads the reservations
 * that match the given mobile number and passes them up to the parent element for display.
 * @param {Array} reservations Array of reservations passed by the parent elemtn
 * @param {function} setReservations State setting function for the reservations array 
 * @returns JSX for the element
 */
function SearchByMobileNumberForm({ reservations, setReservations }){
    // State variables for tracking the mobile number, any submission errors, and a "no matches" variable
    const [ mobileNumber, setMobileNumber ] = useState("");
    const [ submissionError, setSubmissionError ] = useState(null);
    const [ noReservations, setNoReservations ] = useState(null);

    // Submission handler for the Search form
    function handleSumbission(event){
        event.preventDefault();
        setSubmissionError(null);
        const abortController = new AbortController();
        searchReservationByMobileNumber(mobileNumber, abortController.signal)
            .then(setReservations)
            .catch(setSubmissionError);
        // If we found no matching reservations, then set a display to indicate this
        if (reservations.length === 0){
            setNoReservations(<h5>No reservations found.</h5>);
        }
    }

    // Event handler for when the form's values are changed, 
    // so we can track the change in our state variable
    const handleChange = ({ target }) => {
        const value = target.value;
        setMobileNumber(value);
    };

    // Returns the JSX for the element
    return (
        <div className="col">
            <form onSubmit={handleSumbission}>
                <div className="form-group">
                    <label htmlFor="mobile_number" className="mx-2">
                        Mobile Number
                        <input 
                            type="text"
                            className="form-control" 
                            name="mobile_number" 
                            id="mobile_number" 
                            onChange={handleChange}
                            placeholder="Enter a customer's phone number" 
                            value={mobileNumber}
                        />
                    </label>
                    <button type="submit" className="btn btn-primary">Find</button>
                </div>
            </form>
            {reservations.length === 0 && noReservations}
            <ErrorAlert error={submissionError} />
        </div>
    );
}

export default SearchByMobileNumberForm;