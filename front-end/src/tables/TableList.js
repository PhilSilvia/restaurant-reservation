import React from "react";
import TableDisplay from "./TableDisplay";

function TableList({ tables = [] }){
    if (tables.length){
        const list = tables
            .map((table) => (
                <div key={table.table_id}>
                    <TableDisplay table={table} />
                </div>
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