const knex = require("../db/connection");

async function list(){
    return knex("tables").select("*");
}

async function read(tableId){

}

async function write(newTable){

}

module.exports = {
    list,
    read,
    write,
};