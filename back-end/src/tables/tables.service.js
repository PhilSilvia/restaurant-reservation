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

module.exports = {
    list,
    read,
    create,
    update,
};