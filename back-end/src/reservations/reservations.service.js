const knex = require("../db/connection");

/**
 * List function for the reservations
 * @returns A list of all reservations that are not finished
 */
async function list(){
    return knex("reservations")
        .select("*")
        .whereNot({ "status": "finished"});
}

/**
 * List function for a specific reservation date
 * @param {string} date The date of the reservations to be listed
 * @returns A list of all reservations that are not finished that match the given date
 */
async function readDate(date){
    return knex("reservations")
        .select("*")
        .where({"reservation_date": date})
        .whereNot({ "status": "finished"})
        .orderBy('reservation_time');
}

/**
 * Search function for a particular mobile number
 * @param {string} mobile_number The mobile number we are searching for
 * @returns All reservations that match the given mobile number
 */
async function searchMobileNumber(mobile_number){
    return knex("reservations")
        .whereRaw(
            "translate(mobile_number, '() -', '') like ?",
            `%${mobile_number.replace(/\D/g, "")}%`
        )
        .orderBy("reservation_date");
}

/**
 * Read function that returns the single reservation matching the given id
 * @param {number} reservationId The id of the reservation
 * @returns The reservation matching the given id
 */
async function read(reservationId){
    return knex("reservations")
        .select("*")
        .where({"reservation_id": reservationId});
}

/**
 * Create function that adds a new reservation with the given values to the database
 * @param {object} reservation The data for the new reservation
 * @returns The created reservation
 */
async function create(reservation){
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

/**
 * Update function that changes the values of a given reservation
 * @param {object} updatedReservation The new data to be updated
 * @returns The updated reservation
 */
async function update(updatedReservation){
    return knex("reservations")
        .select("*")
        .where({ "reservation_id": updatedReservation.reservation_id })
        .update(updatedReservation, "*")
        .then((updated) => updated[0]);
}

module.exports = {
    list,
    readDate,
    searchMobileNumber,
    read,
    create,
    update,
};