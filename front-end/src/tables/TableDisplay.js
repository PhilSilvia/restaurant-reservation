import React from "react";
import { clearTable } from "../utils/api";

function TableDisplay({ table }){

    const finishHandler = (event) => {
        event.preventDefault();
        if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")){
            const abortController = new AbortController();
            clearTable(table, abortController.signal)
                .then(() => window.location.reload())
                .catch((error) => console.error(error));
        }
    }

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