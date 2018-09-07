import Vue from 'vue'

Vue.filter('am-pm', (date) => {
  return formatAMPM(date)
})

export function formatAMPM(date) {
  if (!date) {
    return ''
  }
  if (typeof date === 'string' || date instanceof String) {
    const [hours, mins] = date.split(':')
    const ampm = hours >= 12 ? 'pm' : 'am';
    return `${hours > 12 ? hours - 12 : hours}:${mins} ${ampm}`
  }
  if (!(date instanceof Date)) {
    return date;
  }
  const ampm = date.getHours() >= 12 ? 'pm' : 'am';
  return `${getHoursIn12HourFormat(date)}:${pad(date.getMinutes(), 2)}:${pad(date.getSeconds(), 2)} ${ampm}`;
}

export function getCurrentHour(date, zone) {
  if (!date) {
    return ''
  }
  return date.toLocaleTimeString('en', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: zone
  })
}

function getHoursIn12HourFormat(date) {
  let hours = date.getHours();
  hours = hours % 12;
  hours = hours > 0 ? hours : 12; // the hour '0' should be '12'
  return hours;
}

function pad(num, size) {
  return ('000000000' + num).substr(-size);
}
