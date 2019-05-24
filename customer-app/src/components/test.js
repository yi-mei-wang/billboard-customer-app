// selectedDate !== null && selectedDate.getMonth() - today.getMonth() > 0
//   ? midnight
//   : selectedDate.getDate() - today.getDate() > 0
//   ? midnight
//   : today.setMinutes(m);

selectedDate = "A";

selectedDate !== null && console.log(0);
// ? console.log("b")
// : 24 - 23 > 0
// ? console.log("c")
// : console.log("d");
if (selectedDate !== null) {
  if (selectedDate.getMonth() - today.getMonth() === 0) {
    if (selectedDate.getDate() - today.getDate() === 0) {
      minDate = today.setMinutes(m);
    }
  }
} else {
  minDate
}
