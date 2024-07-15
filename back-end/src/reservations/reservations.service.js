const knex = require("../db/connection");

async function list(){
    return knex("reservations").select("*");
}

async function readDate(date){
    return knex("reservations")
        .select("*")
        .where({"reservation_date": date})
        .orderBy('reservation_time');
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

module.exports = {
    list,
    readDate,
    read,
    create,
};