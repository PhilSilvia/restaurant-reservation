import { convertToDate, compareDates, compareTimes } from "../utils/date-time";

/** Checks the data to see if all fields are valid.
* Fields are valid if they are not null.
* The "people" field needs to be greater than 0.
* @param {object} data
* @returns {Error} error
* Returns an error with an error message if the data is invalid, otherwise returns null.
*/
export function checkForValidData(data) {
   // Map for the variable name to a more user-friendly name
   const fieldMap = new Map([
       ["first_name", "First Name"], 
       ["last_name", "Last Name"], 
       ["mobile_number", "Mobile Phone Number"], 
       ["reservation_date", "Reservation Data"], 
       ["reservation_time", "Reservation Time"], 
       ["people", "Party Size"]]);
   // Array of the fields for easy iterating
   const fields = [...fieldMap.keys()];
   // Go through each field
   for (let i = 0; i < fields.length; i++){
       const field = fields[i];
       // If a field is null, then return an error necessitating that field
       if (!data[field]){
           return new Error(`${fieldMap.get(field)} is required`);
       }
   }
   // If the party size is 0 or fewer, return an error for that, too
   if (Number(data["people"]) <= 0)
       return new Error("Party size must be a number greater than zero")
   // Check to ensure the date and time are in the future and not a Tuesday
   return validateTheDateAndTime(data.reservation_date, data.reservation_time);
}

/**
     * Validation checker for the reservation date.
     * Ensure the date is not in the past and not on a Tuesday, when the restaurant is closed.
     * @param {string} date 
     * @returns {Error} error 
     * Returns an error with an error message if the date is invalid, otherwise returns null.
     */
function validateTheDateAndTime(date, time){
    const realDate = convertToDate(date);
    const today = new Date();
    // Compare the date to today
    const dateComparison = compareDates(realDate, today);
    if (dateComparison < 0){
        return new Error(`Reservations must be made for the future, please choose a valid date.`);
    }
    // Get the day of the week for the date
    const dayOfWeek = realDate.getDay();
    // Make sure the date isn't a Tuesday
    if (dayOfWeek === 2){
        return new Error(`Reservations cannot be made on Tuesdays, please choose a day when the restaurant is open.`);
    }

    // If the reservation is for today, make sure it's before the current time
    if (dateComparison === 0){
        const now = `${today.getHours()}:${today.getMinutes()}`;
        if (compareTimes(time, now) <= 0){
            return new Error(`Reservations must be made for the future, please choose a valid time.`);;
        }
    }

    // Make sure the time is within the open hours of the restaurant
    const openingTime = "10:30";
    const closingTime = "21:30";
    if (compareTimes(time, openingTime) < 0)
        return new Error(`Reservations must be made after the restaurant opens at ${openingTime}`);
    if (compareTimes(time, closingTime) > 0)
        return new Error(`Reservations must be made before the restaurant closes at ${closingTime}`);
    return null;
}