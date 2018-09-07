import { trimWithMask } from '@/common/masked-trim'

export default {
  parseFiles (files, prefixes) {
    return parseFiles(files, prefixes)
  }
}

const parseFiles = (files, prefixes) => {
  return files.map(file => {
    return parseFile(file, prefixes)
  });
}

const parseFile = (file, prefixes) => {
  const fileInfo = {
    name: parseFileName(file),
    namePrefix: '',
    baseName: getBaseName(file),
    displayName: '',
    effectiveDate: parseEffectiveDate(file),
    effectiveTime: parseEffectiveTime(file),
    lastRefresh: new Date()
  };
  fileInfo.namePrefix = prefixes.find(pref => fileInfo.name.startsWith(pref))
  fileInfo.displayName = fileInfo.name
  return fileInfo;
}

const parseFileName = (fileName) => {
  return fileName.replace('.html', '');
}

const getBaseName = (fileName) => {
  const month = findMonth(fileName);
  if (!month.found) {
    return fileName;
  }
  const base = trimWithMask( fileName.substr(0, month.pos - 4), '( ');
  return base;
}

const findMonth = (fileName) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const words = fileName.split(' ');
  const month = {pos: -1, number: -1, found: false};
  let monthIndex = -1;
  for (const word of words) {
    monthIndex = months.indexOf(word);
    if ( monthIndex > -1 ) {
      month.number = monthIndex;
      month.pos = fileName.indexOf(months[monthIndex]);
      month.found = true;
      break;
    }
  }
  return month;
}

const parseEffectiveDate = (fileName) => {
  const month = findMonth(fileName);
  if (month.found) {
    const day = parseInt(fileName.substr(month.pos - 3, 2), 0);
    const year = parseInt(fileName.substr(month.pos + 4, 4), 0);
    return new Date(year, month.number, day);
  }
  return null;
}

const parseEffectiveTime = (fileName) => {
  const time = fileName.match(/\d\d\.\d\d/);
  if (!time) {
    return '';
  }
  return time[0].replace('.', ':');
}
