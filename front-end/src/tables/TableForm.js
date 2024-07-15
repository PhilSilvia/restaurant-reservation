import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkForValidTableData } from "../validation/validationChecks";
import ErrorAlert from "../layout/ErrorAlert";

function TableForm(){
    const [formData, setFormData] = useState({
        table_name: "",
        capacity: 1,
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

    function handleSubmission(event){
        event.preventDefault();
        setSubmissionError(null);
        const error = checkForValidTableData(formData);
        setSubmissionError(error)
        if (!error){
            // Submit the form data to the api
            navigate("/");
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