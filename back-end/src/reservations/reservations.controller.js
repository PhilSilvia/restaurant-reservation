const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  console.log("We got to the controller.");
  const data = await service.list();
  console.log(data);
  res.json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
