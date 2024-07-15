import React from "react";

function TableDisplay({ table_name, status }){
    return (
        <div className="card my-2">
            <div className="card-body">
                <h5 className="card-title">
                    {table_name}
                </h5>
                <p className="card-text">
                    Status: {status}<br />
                </p>
            </div>
        </div> 
    );
}

export default TableDisplay;