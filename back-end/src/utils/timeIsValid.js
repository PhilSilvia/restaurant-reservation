/**
 * Validation function to check the validity of a time string. 
 * @param {string} time 
 */
function timeIsValid(time) {
    if (time){
        const regex1 = /^\d{2}:\d{2}:\d{2}$/;
        const regex2 = /^\d{2}:\d{2}$/;
        
        if (!(time.match(regex1) || time.match(regex2))){
            return false;
        }
          
        const parts = time.split(':');
        const hour = Number(parts[0]);
        const minutes = Number(parts[1]);
        const seconds = Number(parts[2]);
  
        if (hour < 0 || hour > 24 || minutes < 0 || minutes > 60)
            return false;
        if (seconds && (seconds < 0 || seconds > 60))
            return false;
        return true;
    }
    return false
  }

module.exports = timeIsValid;