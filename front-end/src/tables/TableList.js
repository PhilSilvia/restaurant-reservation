import React from "react";
import TableDisplay from "./TableDisplay";

function TableList({ tables = [] }){
    if (tables.length){
        const list = tables
            .map((table) => (
                <TableDisplay 
                    table_name={table.table_name}
                    status={table.status}
                />
            ));
        
        return (
            <section className="mt-4">
                {list}
            </section>
        );
    }
    return null;
}

export default TableList;