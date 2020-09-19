export function dateFormatter (isoDate) {
    var d = new Date(isoDate);
    var date = d.toDateString();
    var ampm = d.getHours() >= 12 ? ' PM' : ' AM';
    var time = ('0' + (d.getHours() % 12)).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ampm;
    return {
        date: date,
        time: time
    }
    // return`${date} at ${time}`;
}

// export default DateFormatter;

