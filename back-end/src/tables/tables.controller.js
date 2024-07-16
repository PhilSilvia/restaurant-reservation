const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const reservationService = require("../reservations/reservations.service");

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
 * Validation helper function for the capacity parameter in a new or updated table.
 * Ensures that the capacity parameter is greater than 0. 
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
 * Validation helper function for the table_name parameter in a new or updated table.
 * Ensure that the table_name is more than a single character.
 */
function tableNameIsValid(req, res, next){
  const { data: { table_name } = {} } = req.body;
  if (table_name.length > 1){
    return next();
  }
  next({
    status: 400,
    message: `The 'table_name' property must be longer than a single character. Received ${table_name}.`
  });
}

/**
 * Validation middleware function to ensure a specified table exists.
 */
async function tableExists(req, res, next){
  const { tableId } = req.params;
  const table = await service.read(tableId);
  if (table && table.length > 0){
    res.locals.table = table[0];
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
  res.json({ data: res.locals.table });
}

/**
 * Create handler for tables resources
 */
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

/**
 * Helper function to ensure the capacity is sufficient for the reservation. 
 */
function capacityIsSufficient(req, res, next){
  const { reservation, table } = res.locals;
  if (table.capacity >= reservation.people){
    return next();
  }
  next({
    status: 400,
    message: `Table capacity is insufficient for a party this size.`,
  });
}

/**
 * Helper function to ensure the table is not currently occupied.
 */
function tableNotOccupied(req, res, next){
  const { table } = res.locals;
  if (table.status === "Free"){
    res.locals.status = "Occupied";
    return next();
  }
  next({
    status: 400,
    message: `Table is occupied.`,
  });
}

/**
 * Helper function to ensure that the indicated reservation actually exists
 */
async function reservationExists(req, res, next){
  const { reservation_id } = req.body.data;
  const reservation = await reservationService.read(reservation_id);
  if (reservation && reservation.length > 0){
    res.locals.reservation = reservation[0];
    return next();
  }
  next({
    status: 404,
    message: `Reservation id ${reservation_id} cannot be found`,
  });
}

/**
 * Update handler for tables resources
 */
async function update(req, res){
  const updatedTable = {
    ...res.locals.table,
    ...req.body.data,
    table_id: res.locals.table.table_id,
    status: res.locals.status? res.locals.status : res.body.data.status,
  };
  const data = await service.update(updatedTable);
  res.status(200).json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [
      asyncErrorBoundary(tableExists),
      asyncErrorBoundary(read),
    ],
    create: [
      bodyDataHas("table_name"),
      bodyDataHas("capacity"),
      capacityIsValid,
      tableNameIsValid,
      asyncErrorBoundary(create),
    ],
    seat: [
      bodyDataHas("reservation_id"),
      asyncErrorBoundary(tableExists),
      asyncErrorBoundary(reservationExists),
      capacityIsSufficient,
      tableNotOccupied,
      asyncErrorBoundary(update),
    ],
    update: [
      bodyDataHas("table_name"),
      bodyDataHas("capacity"),
      tableNameIsValid,
      capacityIsValid,
      asyncErrorBoundary(tableExists),
      asyncErrorBoundary(update),
    ],
};