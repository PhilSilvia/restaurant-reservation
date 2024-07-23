import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { searchReservationByMobileNumber } from "../utils/api";

function SearchByMobileNumberForm({ reservations, setReservations }){
    const [ mobileNumber, setMobileNumber ] = useState("");
    const [ submissionError, setSubmissionError ] = useState(null);

    // Submission handler for the Search form
    function handleSumbission(event){
        event.preventDefault();
        setSubmissionError(null);
        const abortController = new AbortController();
        searchReservationByMobileNumber(mobileNumber, abortController.signal)
            .then(setReservations)
            //.then(() => window.location.reload())
            .catch(setSubmissionError);
    }

    // Event handler for when the form's values are changed, 
    // so we can track the change in our state variable
    const handleChange = ({ target }) => {
        const value = target.value;
        setMobileNumber(value);
    };

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
            <ErrorAlert error={submissionError} />
        </div>
    );
}

export default SearchByMobileNumberForm;