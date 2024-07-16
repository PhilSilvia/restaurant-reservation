import { convertToDate, compareDates, compareTimes } from "../utils/date-time";

/** 
* Checks to see if all of the fields in the given form data for a reservation are valid. 
* Fields are valid if they are not null.
* The "people" field needs to be greater than 0.
* @param {object} data
* @returns {Error} error
* Returns an error with an error message if the data is invalid, otherwise returns null.
*/
export function checkForValidReservationData(data) {
    // Map for the variable name to a more user-friendly name
    const fieldMap = new Map([
       ["first_name", "First Name"], 
       ["last_name", "Last Name"], 
       ["mobile_number", "Mobile Phone Number"], 
       ["reservation_date", "Reservation Data"], 
       ["reservation_time", "Reservation Time"], 
       ["people", "Party Size"]]);
    // Check for any missing fields
    const error = hasFields(data, fieldMap);
    if (error)
        return error;
    // If the party size is 0 or fewer, return an error for that, too
    if (Number(data["people"]) <= 0)
       return new Error("Party size must be a number greater than zero")
    // Check to ensure the date and time are in the future and not a Tuesday
    return validateTheDateAndTime(data.reservation_date, data.reservation_time);
}

/**
 * Checks to see if all of the fields in the given form data for a table are valid. 
 * Fields are valid if they are not null.
 * The capacity value must be greater than 0.
 * @param {object} data 
 * @returns {Error} error
 * Returns an error with an error message if the data is invalid, otherwise returns null
 */
export function checkForValidTableData(data){
    // Map for the variable name to a more user-friendly name
    const fieldMap = new Map([
        ["table_name", "Table Name"], 
        ["capacity", "Seating Capacity"], 
    ]);
    // Check for any missing fields
    const error = hasFields(data, fieldMap);
    if (error) 
        return error;
    // If the table's capacity is 0 or fewer, return an error for that, too
    if (Number(data["capacity"]) <= 0)
        return new Error("Seating capacity must be a number greater than zero");
    return null;
}

/**
 * Checks to make sure that the selected table is a valid option for the given reservation.
 * The table is valid if it's status is "Free" and its capacity is equal to or exceeding the
 *  party size of the reservation, given by its 'people' attritubte. 
 * @param {int} tableId The id of the selected table
 * @param {Array} tables The array of loaded tables
 * @param {object} reservation The reservation being seated
 * @returns {Error} 
 * Returns an error if there is anything wrong with the table assignment, otherwise returns null.
 */
export function checkForValidTable(tableId, tables, reservation){
    // Make sure we actually have loaded tables
    if (!tables)
        return new Error('No tables are loaded, please try again');
    // Retrieve our selected table from the list of tables
    const table = tables.find((table) => Number(table.table_id) === Number(tableId));
    // Make sure we found the indicated table
    if (!table)
        return new Error(`No table with id of ${tableId} found`);
    // Ensure the table is currently free
    if (table.status !== "Free")
        return new Error(`This table is currently unavailable, please choose another talbe.`);
    // Ensure the table has sufficient seating
    if (reservation.people > table.capacity)
        return new Error(`This table has insufficient seating capacity, please choose another table.`);
    return null;
}

/**
 * Validation checker to ensure the given data includes all of the fields in a given Map.
 * @param {object} data
 * @param {Map} fieldMap
 * @returns {Error} error
 * Returns an error with a helpful message if any field is missing, otherwise returns null.
 */
function hasFields(data, fieldMap){
    // Array of the fields for easy iterating
    const fields = [...fieldMap.keys()];
    // Go through each field
    for (let i = 0; i < fields.length; i++){
        const field = fields[i];
        // If a field is null, then return an error necessitating that field
        if (!data[field])
            return new Error(`${fieldMap.get(field)} is required`);
    }
    return null;
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