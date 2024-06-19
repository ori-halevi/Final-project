var timeString = "09:00:00";
var dateString = "2024-07-04";
var dateTimeString = dateString + "T" + timeString;
var dateObject = new Date(dateTimeString);

var formattedDateTimeString = dateObject.toISOString();
console.log(formattedDateTimeString);
