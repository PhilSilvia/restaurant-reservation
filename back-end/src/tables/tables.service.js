const knex = require("../db/connection");

async function list(){
    return knex("tables").select("*");
}

async function read(tableId){

}

async function create(newTable){
    return knex("tables")
        .insert(newTable)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

module.exports = {
    list,
    read,
    create,
};