import React from "react";

function TableDisplay({ table_name, status, table_id }){
    return (
        <div className="card my-2">
            <div className="card-header">
                <h5 className="card-title">
                    {table_name}
                </h5>
            </div>
            <div className="card-body">
                <p className="card-text" data-table-id-status={table_id}>
                    Status: {status}<br />
                </p>
                {status === "Occupied" && (
                    <button className="btn btn-success" data-table-id-finish={table_id}>
                        Finish
                    </button>
                )}
            </div>
        </div> 
    );
}

export default TableDisplay;