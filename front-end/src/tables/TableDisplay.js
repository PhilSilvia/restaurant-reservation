import React from "react";

function TableDisplay({ table_name, status, table_id }){
    return (
        <div className="card my-2">
            <div className="card-body">
                <h5 className="card-title">
                    {table_name}
                </h5>
                <p className="card-text" data-table-id-status={table_id}>
                    Status: {status}<br />
                </p>
            </div>
        </div> 
    );
}

export default TableDisplay;