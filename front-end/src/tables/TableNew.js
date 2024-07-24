import React from "react";
import TableForm from "./TableForm";

/**
 * Defines the JSX for the page for creating a new table
 * @returns JSX for the element
 */
function TableNew(){
    // Returns the JSX for the element)
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