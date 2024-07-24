const knex = require("../db/connection");

/**
 * List function that returns all tables from the database
 * @returns All tables from the database
 */
async function list(){
    return knex("tables").select("*")
        .orderBy("table_name");
}

/**
 * Read function that returns the data for the table matching a given id from the databse
 * @param {number} tableId The id of the desired table
 * @returns The information for the given table id
 */
async function read(tableId){
    return knex("tables")
        .select("*")
        .where({"table_id": tableId});
}

/**
 * Create function to add a new table to the database
 * @param {object} newTable The values for the new table
 * @returns The newly created table
 */
async function create(newTable){
    return knex("tables")
        .insert(newTable)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

/**
 * Update function to updates the values for a table
 * @param {object} updatedTable Values to be updated
 * @returns The newly updated table
 */
async function update(updatedTable){
    return knex("tables")
        .select("*")
        .where({ "table_id": updatedTable.table_id })
        .update(updatedTable, "*")
        .then((updated) => updated[0]);
}

/**
 * Update function that will attempt to update a reservation and a table, doing neither if either fails.
 * @param {object} updatedTable The table values to be updated
 * @param {object} updatedReservation The reservation values to be updated
 */
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