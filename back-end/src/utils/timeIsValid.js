/**
 * Validation function to check the validity of a time string. 
 * @param {string} time 
 */
function timeIsValid(time, isToday = false) {
    if (time){
        // Check for either HH:MM:SS or HH:MM format
        const regex1 = /^\d{2}:\d{2}:\d{2}$/;
        const regex2 = /^\d{2}:\d{2}$/;
        
        if (!(time.match(regex1) || time.match(regex2))){
            return `reservation_time must be in the HH:MM:SS or HH:MM format. Received ${time}`;
        }
        
        // Split the time into its parts for easy comparison
        const parts = time.split(':');
        const hour = Number(parts[0]);
        const minutes = Number(parts[1]);
        const seconds = Number(parts[2]);
  
        // Make sure the time is valid
        if (hour < 0 || hour > 24 || minutes < 0 || minutes > 60)
            return `reservation_time must be a valid time. Received ${time}`;;
        if (seconds && (seconds < 0 || seconds > 60))
            return `reservation_time must be a valid time. Received ${time}`;;

        // If the reservation is for today, we need to make sure the time is in the future
        if (isToday){
            // Grab the current time
            const today = new Date();
            const hoursNow = Number(today.getHours());
            const minutesNow = Number(today.getMinutes());

            // Check to ensure the time is in the future
            if (hour < hoursNow)
                return `reservation_time must be a time in the future. Received ${time}`;
            if (hour === hoursNow && minutes < minutesNow)
                return `reservation_time must be a time in the future. Received ${time}`;
        }
        return null;
    }
    return `reservation_time must not be null. Received ${time}`;
  }

module.exports = timeIsValid;