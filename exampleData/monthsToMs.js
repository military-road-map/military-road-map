function monthToMillisecond(month) {
  // month*#month/yr*#day/month*#hr/day*min/hr*sec/min*ms/sec
  return month * 30 * 24 * 60 * 60 * 1000;
}

console.log(monthToMillisecond(24));
console.log(monthToMillisecond(18));
console.log(monthToMillisecond(12));
console.log(monthToMillisecond(6));
console.log(monthToMillisecond(4));
console.log(monthToMillisecond(3));
