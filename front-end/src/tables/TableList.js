import React from "react";
import TableDisplay from "./TableDisplay";

/**
 * Defines the JSX for the Table List element
 * @param {array} tables Tables for displaying given by the parent element 
 * @returns JSX for the element
 */
function TableList({ tables = [] }){
    // Only display once we have been given tables to display
    if (tables.length){
        // Create a list of Table Display elements from the tables array
        const list = tables
            .map((table) => (
                <div key={table.table_id}>
                    <TableDisplay table={table} />
                </div>
            ));
        
        // Return the JSX for the element
        return (
            <section className="mt-4">
                {list}
            </section>
        );
    }
    return null;
}

export default TableList;