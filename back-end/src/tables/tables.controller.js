const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

/**
 * Validation helper function for the reservation validation
 * @param {string} propertyName 
 * @returns 
 */
function bodyDataHas(propertyName){
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Must include a ${propertyName}` });
  };
}

/**
 * Validation helper function for the people parameter in a new or updated reservation.
 * Ensures that the people parameter is greater than 0. 
 */
function capacityIsValid(req, res, next){
  const { data: { capacity } = {} } = req.body;
  if (typeof(capacity) === "number" && capacity > 0){
      return next();
  }
  next({ 
      status: 400, 
      message: `Value of the 'capacity' property must be a number greater than 0. Received ${capacity}.`
  });
}

/**
 * Validation middleware function to ensure a specified table exists.
 */
async function tableExists(req, res, next){
  const { tableId } = req.params;
  const table = await service.read(tableId);
  if (table && table.length > 0){
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `Table id ${tableId} cannot be found`,
  });
}

/**
 * List handler for tables resources
 */
async function list(req, res) {
    const data = await service.list();
    res.json({ data: data });
  }

/**
 * Read handler for tables resources
 */
function read(req, res){
  res.status(201).json({ data: res.locals.table });
}

async function create(req, res){
  const { data: { table_name, capacity } = {} } = req.body;
  const newTable = {
    table_name,
    capacity,
    status: "Free",
  };
  const response = await service.create(newTable);
  res.status(201).json({ data: response });
}

async function update(req, res){

}

module.exports = {
    list: asyncErrorBoundary(list),
    read,
    create: [
      bodyDataHas("table_name"),
      bodyDataHas("capacity"),
      capacityIsValid,
      asyncErrorBoundary(create),
    ],
    update: [
      bodyDataHas("table_name"),
      bodyDataHas("capacity"),
      capacityIsValid,
      asyncErrorBoundary(tableExists),
      asyncErrorBoundary(update),
    ],
};