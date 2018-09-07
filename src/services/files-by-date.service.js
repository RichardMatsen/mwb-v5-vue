export default {
  getCountFilesForLastNDays(numDays, files) {
    return getCountFilesForLastNDays(numDays, files)
  },
  filesByDate(files) {
    return filesByDate(files)
  }
}

const getCountFilesForLastNDays = (numDays, files) => {
  return filesByDate(files)
    .slice(0, numDays)
    .map(group => group.files.length)
    .reduce((total, num) => { total += num; return total; }, 0 );
}

const filesByDate = (files) => {
  const keyFn = (file) => { return formatDate(file.effectiveDate); };
  return groupBy(files, keyFn)
    .map(group => { return { date: group.key, files: group.group }; });
}

const groupBy = (arr, keyFn) => {
  const grouped = arr.reduce( (grouping, item) => {
    const key = keyFn(item);
    grouping[key] = grouping[key] || [];
    grouping[key].push(item);
    return grouping;
  }, {} );
  return Object.keys(grouped)
    .map(key => { return {key: key, group: grouped[key]}; });
}

const formatDate = (date) => {
  let d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();
  month = month.length < 2 ? '0' + month : month;
  day = day.length < 2 ? '0' + day : day;
  return [year, month, day].join('-');
}
