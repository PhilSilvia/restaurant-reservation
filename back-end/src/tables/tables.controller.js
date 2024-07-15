const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

/**
 * List handler for tables resources
 */
async function list(req, res) {
    const data = await service.list();
    res.json({ data: data });
  }

function read(req, res){
    
}

function create(req, res){

}

module.exports = {
    list : asyncErrorBoundary(list),
    read,
    create,
};