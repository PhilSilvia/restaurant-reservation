const knex = require("../db/connection");

async function list(){
    return knex("reservations")
        .select("*")
        .whereNot({ "status": "finished"});
}

async function readDate(date){
    return knex("reservations")
        .select("*")
        .where({"reservation_date": date})
        .whereNot({ "status": "finished"})
        .orderBy('reservation_time');
}

async function searchMobileNumber(mobile_number){
    return knex("reservations")
        .whereRaw(
            "translate(mobile_number, '() -', '') like ?",
            `%${mobile_number.replace(/\D/g, "")}%`
        )
        .orderBy("reservation_date");
}

async function read(reservationId){
    return knex("reservations")
        .select("*")
        .where({"reservation_id": reservationId});
}

async function create(reservation){
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

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