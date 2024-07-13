/**
 * Validation function to check the validity of a date string. 
 * TODO: Does not account for a leap year. 
 * @param {string} date 
 */
function dateIsValid(date){
  if (date){
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    
    // Make sure the date is in a valid format
    if (!date.match(regex)){
      return false;
    }

    // Break up the date into its parts
    const parts = date.split('-');
    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);
      
    if (month < 1 || month > 12 || day < 1 || day > 31){
      return false;
    }
    const shortMonths = [4,6,9,11];
    if (shortMonths.includes(month) && day > 30)
      return false;
    if (month === 2 && day > 28)
      return false;

    // Get today's date and break it up into its parts
    const today = new Date();
    const yearToday = Number(today.getFullYear());
    const monthToday = Number(today.getMonth());
    const dayToday = Number(today.getDate());

    if (year < yearToday){
      if (month < monthToday){
        if (day < dayToday){
          return false;
        }
      }
    }

    return true;
  
  }
  return false;
}

module.exports = dateIsValid;