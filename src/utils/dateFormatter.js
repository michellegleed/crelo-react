export function dateObjectFormatter(isoDate) {
  var d = new Date(isoDate);
  var date = d.toLocaleDateString("en-GB", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  var ampm = d.getHours() >= 12 ? " PM" : " AM";
  var time =
    ("0" + (d.getHours() % 12)).slice(-2) +
    ":" +
    ("0" + d.getMinutes()).slice(-2) +
    ampm;

  return {
    date: date,
    time: time
  };
}

export function timeLeftFormatter(isoDate) {
  // difference is calculated in milliseconds. Dividing result by milliseconds per hour will give the difference in hours.
  const _MS_PER_HR = 1000 * 60 * 60;

  var dueDate = new Date(isoDate);
  var now = new Date(Date.now());

  // const diff = Math.round(utc2 - utc1) / _MS_PER_HR;
  const diff = Math.round(dueDate - now) / _MS_PER_HR;

  // console.log("diff in hours", diff);

  const days = Math.round(diff / 24);
  const hours = Math.round(diff % 24);

  return {
    days: days,
    hours: hours,
  };

}
