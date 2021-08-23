//async sleep
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//format from Date to yyyy-mm-dd
export function dateToString(d) {
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
