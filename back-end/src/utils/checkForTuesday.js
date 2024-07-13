function checkForTuesday(myDate){
    const pieces = myDate.split("-");
    const date = new Date();
    date.setFullYear(pieces[0]);
    date.setMonth(Number(pieces[1])-1);
    date.setDate(pieces[2]);
    return date.getDay() === 2;
}

module.exports = checkForTuesday;