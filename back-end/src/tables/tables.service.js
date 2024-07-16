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

async function update(table){
    
}

module.exports = {
    list,
    read,
    create,
    update,
};