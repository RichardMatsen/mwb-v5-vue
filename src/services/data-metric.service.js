
export default {
  getMetric (fileType, tempDiv) {
    return getMetric(fileType, tempDiv)
  },
  getBadgeColor (fileType, metric) {
    return getBadgeColor(fileType, metric)
  }
}

const getMetric = (fileType, tempDiv) => {
  if(fileType === 'referentials') {
    return getReferentialsMetric(tempDiv)
  }
  if(fileType === 'validations') {
    return getValidationsMetric(tempDiv)
  }
  if(fileType === 'clinics') {
    return getClinicsMetric(tempDiv)
  }  
}

const getValidationsMetric = (tempDiv) => {
  let total = 0;
  const elementsWithCount = tempDiv.getElementsByClassName('typeheader');
  for (let i = 0; i < elementsWithCount.length; ++i) {
    const countAsString = elementsWithCount[i].innerHTML.substr(1).split(' ')[0];
    const isnum = /^\d+$/.test(countAsString);
    if (isnum) {
      total += Number(countAsString);
    }
  }
  return total;
}

const getReferentialsMetric = (tempDiv) => {
  let total = 0;
  const elementsWithColumnTotal = tempDiv.getElementsByClassName('columntotal');
  const totalAsString = elementsWithColumnTotal[3].innerHTML;
  const isnum = /^\d+$/.test(totalAsString);
  if (isnum) {
    total = Number(totalAsString);
  }
  return total;    
}

const getClinicsMetric = (tempDiv) => {
  let totalErrors = 0;
  const elementsAffected = tempDiv.getElementsByClassName('columntotal affected');
  for (let i = 0; i < elementsAffected.length; i++) {
    totalErrors += getTotalFromElement(elementsAffected[i]);
  }

  const elementsActiveAppoints = tempDiv.getElementsByClassName('n active-appoints');
  const activeAppoints = elementsActiveAppoints.length === 0 ? 0 : getTotalFromElement(elementsActiveAppoints[0]);

  const percent = activeAppoints === 0 ? 0 : (activeAppoints - totalErrors) / activeAppoints * 100;
  return `${percent.toFixed(2)}%`;
}

const getTotalFromElement = (element) => {
  let total = 0;
  const totalAsString = element.innerHTML;
  const isnum = /^\d+$/.test(totalAsString);
  if (isnum) {
    total = Number(totalAsString);
  }
  return total;
}

const getBadgeColor = (fileType, metric) => {
  if(fileType === 'referentials') {
    return metric === 0 ? 'green'
      : metric < 10 ? 'orange' : 'red';
  }
  if(fileType === 'validations') {
    return metric === 0 ? 'green'
      : metric < 10 ? 'orange' : 'red';
  }
  if(fileType === 'clinics') {
    const num = +metric.replace('%', '');
    return num >= 95 ? 'green'
      : num >= 75 ? 'orange' : 'red';
  }
  return 'gray';
};
