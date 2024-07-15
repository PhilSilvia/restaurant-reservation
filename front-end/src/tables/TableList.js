import React from "react";
import TableDisplay from "./TableDisplay";

function TableList({ tables = [] }){
    if (tables.length){
        const list = tables
            .map((table) => (
                <TableDisplay 
                    table_name={table.table_name}
                    status={table.status}
                    table_id={table.table_id}
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