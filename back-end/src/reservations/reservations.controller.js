const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date } = req.query;
  let data = {};
  if (date){
    data = await service.read(date);
  } else {
    data = await service.list();
  }
  res.json({ data: data });
}

function validateReservation(req, res){
 
}

/**
 * Create handler for reservation resources
 */
async function create(req, res){

}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [validateReservation, asyncErrorBoundary(create)],
};
