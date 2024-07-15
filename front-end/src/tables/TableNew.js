import React from "react";
import TableForm from "./TableForm";

function TableNew(){
    return (
        <main>
            <h1>Make a New Table</h1>
            <div className="d-md-flex mb-3">
                <TableForm />
            </div>
        </main>
    );
}

export default TableNew;