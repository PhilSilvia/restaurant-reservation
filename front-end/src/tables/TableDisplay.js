import React from "react";
import { clearTable } from "../utils/api";

/**
 * Defines the JSX for the detailed display of a table's information
 * @param {object} table The table being displayed 
 * @returns JSX for the element
 */
function TableDisplay({ table }){
    // Event handler for the finish button, so a table can be cleared
    const finishHandler = (event) => {
        event.preventDefault();
        // Use a confirmation window to help avoid mistakes
        if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")){
            const abortController = new AbortController();
            // Clear the table of the reservation and then reload the page
            clearTable(table.table_id, table.reservation_id, abortController.signal)
                .then(() => window.location.reload())
                .catch((error) => console.error(error));
        }
    }

    // Returns the JSX for the element, displaying it as a Bootstrap card for listing
    return (
        <div className="card my-2">
            <div className="card-header">
                <h5 className="card-title">
                    {table.table_name}
                </h5>
            </div>
            <div className="card-body">
                <p className="card-text" data-table-id-status={table.table_id}>
                    Status: {table.status}<br />
                </p>
                {table.status === "Occupied" && (
                    <button 
                        className="btn btn-success" 
                        data-table-id-finish={table.table_id}
                        value={table.table_id}
                        onClick={finishHandler}
                    >
                        Finish
                    </button>
                )}
            </div>
        </div> 
    );
}

export default TableDisplay;