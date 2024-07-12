const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");
const dateIsValid = require("../utils/dateIsValid");
const timeIsValid = require("../utils/timeIsValid");

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
 * Validation helper function for the people parameter in a new or updated reservation.
 * Ensures that the people parameter is greater than 0. 
 */
function peopleIsValid(req, res, next){
  const { data: { people } = {} } = req.body;
  console.log(typeof(people));
  if (typeof(people) === "number" && people > 0){
      return next();
  }
  next({ 
      status: 400, 
      message: `Value of the 'people' property must be a number greater than 0. Received ${people}.`
  });
}

/**
 * Validation helper function for the reservation_date
 * Ensures it is in a valid YYYY-MM-DD format.
 */
function reservationDateIsValid(req, res, next){
  const { data: { reservation_date } = {} } = req.body;

  if (reservation_date){
    if (dateIsValid(reservation_date)){
      return next();
    }
  }
  next({
    status: 400,
    message: `reservation_date must be in the YYYY-MM-DD format and be a valid date. Received ${reservation_date}`
  });
}

/**
 * Validation helper function for the reservation_time.
 * Ensures that the time is valid. 
 */
function reservationTimeIsValid(req, res, next){
  const { data: { reservation_time } = {} } = req.body;

  if (reservation_time){
    if (timeIsValid(reservation_time)){
      return next();
    }
  }
  next({
    status: 400,
    message: `reservation_time must be in the HH:MM:SS format and be a valid time. Received ${reservation_time}`
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
    reservationDateIsValid,
    reservationTimeIsValid,
    asyncErrorBoundary(create)
  ],
};
