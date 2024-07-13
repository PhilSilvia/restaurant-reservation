const dateFormat = /\d\d\d\d-\d\d-\d\d/;
const timeFormat = /\d\d:\d\d/;

/**
 * Formats a Date object as YYYY-MM-DD.
 *
 * This function is *not* exported because the UI should generally avoid working directly with Date instance.
 * You may export this function if you need it.
 *
 * @param date
 *  an instance of a date object
 * @returns {string}
 *  the specified Date formatted as YYYY-MM-DD
 */
function asDateString(date) {
  return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
    .toString(10)
    .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
}

/**
 * Format a date string in ISO-8601 format (which is what is returned from PostgreSQL) as YYYY-MM-DD.
 * @param dateString
 *  ISO-8601 date string
 * @returns {*}
 *  the specified date string formatted as YYYY-MM-DD
 */
export function formatAsDate(dateString) {
  return dateString.match(dateFormat)[0];
}

/**
 * Format a time string in HH:MM:SS format (which is what is returned from PostgreSQL) as HH:MM.
 * @param timeString
 *  HH:MM:SS time string
 * @returns {*}
 *  the specified time string formatted as YHH:MM.
 */
export function formatAsTime(timeString) {
  return timeString.match(timeFormat)[0];
}

/**
 * Today's date as YYYY-MM-DD.
 * @returns {*}
 *  the today's date formatted as YYYY-MM-DD
 */
export function today() {
  return asDateString(new Date());
}

/**
 * Subtracts one day to the specified date and return it in as YYYY-MM-DD.
 * @param currentDate
 *  a date string in YYYY-MM-DD format (this is also ISO-8601 format)
 * @returns {*}
 *  the date one day prior to currentDate, formatted as YYYY-MM-DD
 */
export function previous(currentDate) {
  let [ year, month, day ] = currentDate.split("-");
  month -= 1;
  const date = new Date(year, month, day);
  date.setMonth(date.getMonth());
  date.setDate(date.getDate() - 1);
  return asDateString(date);
}

/**
 * Adds one day to the specified date and return it in as YYYY-MM-DD.
 * @param currentDate
 *  a date string in YYYY-MM-DD format (this is also ISO-8601 format)
 * @returns {*}
 *  the date one day after currentDate, formatted as YYYY-MM-DD
 */
export function next(currentDate) {
  let [ year, month, day ] = currentDate.split("-");
  month -= 1;
  const date = new Date(year, month, day);
  date.setMonth(date.getMonth());
  date.setDate(date.getDate() + 1);
  return asDateString(date);
}

/**
 * Converts a string as we store the date in our database to a Date object.
 * @param {string} myDate 
 * @returns Date() object created from the date string passed in.
 */
export function convertToDate(myDate){
  const pieces = myDate.split("-");
  const date = new Date();
  date.setFullYear(pieces[0]);
  date.setMonth(Number(pieces[1])-1);
  date.setDate(pieces[2]);
  return date;
}

/**
 * Compares two Date objects to each other.
 * @param {Date} date1 
 * @param {Date} date2 
 * @returns A negative number if date1 is earlier than date2, a positive number if date1 is later than date2,
 *        and 0 if the two dates are the same, ignoring time. 
 */
export function compareDates(date1, date2){
  if (date1.getYear() < date2.getYear())
      return -1;
  if (date1.getMonth() < date2.getMonth())
      return -1;
  return date1.getDate() - date2.getDate();
}

/**
 * Compares two times to each other
 * @param {string} time1
 * @param {string} time2
 * @returns A negative number if time1 is earlier than time2, a positive number if time1 is later than time2,
 *        and 0 if the two times are the same
 */
export function compareTimes(time1, time2){
  const pieces1 = time1.split(":");
  const pieces2 = time2.split(":");
  const hourResult = pieces1[0] - pieces2[0];
  if (hourResult !== 0)
    return hourResult;
  return pieces1[1] - pieces2[1];
}