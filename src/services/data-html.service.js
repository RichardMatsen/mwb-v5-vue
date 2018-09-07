export default {
  prefixStylesWithId(tempDiv, id) {
    return prefixStylesWithId(tempDiv, id)
  },
  removeCommandTimeout(content) {
    return removeCommandTimeout(content)
  }
}

const prefixStylesWithId = (tempDiv, id) => {
  const styleSections = tempDiv.getElementsByTagName('style');
  for (let i = 0; i < styleSections.length; ++i) {
    const styles = styleSections[i];
    const styleLines = styles.innerHTML.split(/\r?\n/);
    const newStyles = [];
    styleLines.forEach((line) => {
      if (line.indexOf('{') !== -1) {
        line = '#' + id + ' ' + line;
        line = replaceAll(line, ',', ', #' + id);
      }
      newStyles.push(line);
    });
    styles.innerHTML = newStyles.join('\n');
  }
}

const removeCommandTimeout = (content) => {
  const searchFor = /Command[\s]+Timeout[\s]+only[\s]+supported[\s]+by[\s]+SQL[\s]+Client[\s]+\(so[\s]+far\)<br\/>/;
  const regex = new RegExp(searchFor, 'g');
  return content.replace(regex, '');
}

const replaceAll = (theString, search, replace) => {
  return theString.replace(new RegExp(escapeRegExp(search), 'g'), replace);
}

const escapeRegExp = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\$&'); // $& means the whole matched string
}
