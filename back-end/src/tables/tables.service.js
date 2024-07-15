const knex = require("../db/connection");

function list(){
    return knex("tables").select("*");
}

function read(tableId){

}

function write(newTable){

}

module.exports = {
    list,
    read,
    write,
};