/**
 * Validation function to check the validity of a date string. 
 * TODO: Does not account for a leap year. 
 * @param {string} date
 * @returns true if the date is valid, false if it is not, and "today" if the date is today 
 */
function dateIsValid(date){
  if (date){
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    
    // Make sure the date is in a valid format
    if (!date.match(regex)){
      return `reservation_date must be in the YYYY-MM-DD format. Received ${date}`;
    }

    // Break up the date into its parts
    const parts = date.split('-');
    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);
      
    // Make sure the month and day are in the proper ranges
    if (month < 1 || month > 12 || day < 1 || day > 31){
      return `reservation_date must be a valid date. Received ${date}`;
    }
    // Check for the short months
    const shortMonths = [4,6,9,11];
    if (shortMonths.includes(month) && day > 30)
      return `reservation_date must be a valid date. Received ${date}`;;
    // Special check for February
    if (month === 2 && day > 28)
      return `reservation_date must be a valid date. Received ${date}`;

    // Get today's date and break it up into its parts
    const today = new Date();
    const yearToday = Number(today.getFullYear());
    const monthToday = Number(today.getMonth())+1;
    const dayToday = Number(today.getDate());

    console.log(`Comparing ${year} to ${yearToday}, ${month} to ${monthToday} and ${day} to ${dayToday}`);

    // Make sure the date isn't earlier than today
    if (year < yearToday)
      return `reservation_date must be in the future. Received ${date}`;;
    if (year === yearToday && month < monthToday)
      return `reservation_date must be in the future. Received ${date}`;;
    if (year === yearToday && month === monthToday && day < dayToday)
      return `reservation_date must be in the future. Received ${date}`;;

    if (today.getDay() === 2)
      return `reservation_date cannot be a Tuesday. Received ${date}`;;

    if (year === yearToday && month === monthToday && day === dayToday)
      return "today";

    return null;
  }
  return `reservation_date cannot be null. Received ${date}`;
}

module.exports = dateIsValid;