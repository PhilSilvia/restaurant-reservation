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
 * Validation function for the people parameter in a new or updated reservation
 */
function peopleIsValid(req, res, next){
  const { data: { people } = {} } = req.body;

  if (Number(people) > 0){
      return next();
  }
  next({ 
      status: 400, 
      message: `Value of the 'people' property must be greater than 0. Received ${exposure}.`
  });
}

/**
 * Create handler for reservation resources
 */
async function create(req, res){
  const { data: { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = {} } = req.body;
  const newReservation = {
    first_name,
    last_name,
    mobile_number, 
    reservation_date,
    reservation_time,
    people
  };
  const response = await service.create(newReservation);
  res.status(201).json({ data: response });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    peopleIsValid, 
    asyncErrorBoundary(create)
  ],
};
