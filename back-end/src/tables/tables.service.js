const knex = require("../db/connection");

async function list(){
    return knex("tables").select("*")
        .orderBy("table_name");
}

async function read(tableId){
    return knex("tables")
        .select("*")
        .where({"table_id": tableId});
}

async function create(newTable){
    return knex("tables")
        .insert(newTable)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

async function update(updatedTable){
    return knex("tables")
        .select("*")
        .where({ "table_id": updatedTable.table_id })
        .update(updatedTable, "*")
        .then((updated) => updated[0]);
}

async function updateTableAndReservation(updatedTable, updatedReservation){
    try {
        await knex.transaction(async (trx) => {
            // Update the reservations table
            const updateReservation = await trx("reservations")
                .where({ reservation_id: updatedReservation.reservation_id })
                .update(updatedReservation)
                .then((updated) => updated[0]);

            if (updateReservation === 0){
                throw new Error("Reservation update failed.");
            }

            // Update the tables table
            const updateTable = await trx("tables")
                .where({ table_id: updatedTable.table_id})
                .update(updatedTable)
                .then((updated) => updated[0]);

            if (updateTable === 0){
                throw new Error("Table update failed.");
            }
        });
    } catch (error) {
        console.error("Transaction failed:", error.message);
    }
}

module.exports = {
    list,
    read,
    create,
    update,
    updateTableAndReservation,
};