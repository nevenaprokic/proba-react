

export function compareString(sortAsc, first, second){
    return (sortAsc) ?  ((first > second) ? 1 : ((second > first) ? -1 : 0)) : ((first < second) ? 1 : ((second < first) ? -1 : 0))
  }

export function addDaysToDate(date_string, days){
  var date = new Date(date_string);
  let next_date = new Date(date.setDate(date.getDate() + parseInt(days)));
  return next_date;
}
export function addDays(date, days) {
  date.setDate(date. getDate() + parseInt(days));
  return date;
  }
export function addDaysToLocalDate(date_string, days){
  var date = new Date(date_string);
  let next_date = new Date(date.setDate(date.getDate() + parseInt(days))).toISOString().split('T')[0];
  return next_date;
}

export function arrayToDateString(arr){
    let d = new Date();
    d.setFullYear(arr[0]);
    d.setMonth(arr[1]-1);
    d.setDate(arr[2]);
    return d;
}

// format of string: dd/MM/yyyy
export function stringToDate(dateStr){
  let tokens = dateStr.split('/');
  return arrayToDateString(tokens.reverse());
}

export function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  a = stringToDate(a);
  b = stringToDate(b);

  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
  return Math.abs(Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24)));
}