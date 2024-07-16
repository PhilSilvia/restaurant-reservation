import React from "react";
import TableDisplay from "./TableDisplay";

function TableList({ tables = [] }){
    if (tables.length){
        const list = tables
            .map((table) => (
                <TableDisplay 
                    table={table}
                    key={table.table_id}
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