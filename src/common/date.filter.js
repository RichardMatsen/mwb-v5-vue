import Vue from 'vue'

Vue.filter('date', (value, format) => {
  return formatDate(value, format)
})

export function formatDate (date, format) {
  if (!date) {
    return ''
  }
  let _date = typeof date === 'string' || date instanceof String ? new Date(date) : date;
  let splitArr = format.split(/(YYYY|MMMM|MMM|MM|DD|hh|mm|ss)+/);
  return splitArr.map(item => {
    if (item === 'YYYY') {
      return _date.getFullYear();
    }
    if (item === 'MM') {
      return padStart(_date.getMonth() + 1, 2, 0);
    }
    if (item === 'MMM') {
      const monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
      return monthNames[_date.getMonth()];
    }
    if (item === 'MMMM') {
      const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
      return monthNames[_date.getMonth()];
    }
    if (item === 'DD') {
      return padStart(_date.getDate(), 2, 0);
    }
    if (item === 'hh') {
      return padStart(_date.getHours(), 2, 0);
    }
    if (item === 'mm') {
      return padStart(_date.getMinutes(), 2, 0);
    }
    if (item === 'ss') {
      return padStart(_date.getSeconds(), 2, 0);
    }
    return item;
  }).join('');    
}

function padStart (value, length, char) {
  value = value + '';
  var len = length - value.length;
  if (len <= 0) {
    return value;
  } else {
    return Array(len + 1).join(char) + value;
  }
}
