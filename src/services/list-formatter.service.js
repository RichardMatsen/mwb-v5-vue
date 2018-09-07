import { trimWithMask } from '@/common/masked-trim'

export default {
  process (files) {
    return process(files)
  }
}

const process = (files) => {
  files.sort(fileInfoComparer);
  sequenceDisplay(files);
  return files;
}

const fileInfoComparer = (a, b) => {
  if (!a.effectiveDate || !b.effectiveDate) {
    throw new Error('Effective dates not valid. a: ' + a + ', b: ' + b);
  }
  return a.effectiveDate > b.effectiveDate ? -1             // Latest date on top
    : a.effectiveDate < b.effectiveDate ? 1
      : a.namePrefix < b.namePrefix ? -1                    // then sort by name prefix to keep similar files together
        : a.namePrefix > b.namePrefix ? 1
          : a.effectiveTime > b.effectiveTime ? -1          // then the latest time (version)
            : a.effectiveTime < b.effectiveTime ? 1 : 0;
}

const sequenceDisplay = (files) => {
  return files.reduce((previous, current) => { sequencer(previous, current); return current; }, null);
}

const sequencer = (previous, current) => {
  current.sequenceNo = getSequenceNo(previous, current);
  setDisplayName(current);
  return current;
}

const getSequenceNo = (previous, current) => {
  if (!previous || !current || !current.effectiveTime) {
    return 0;
  }
  if (!hasSameFileNameAndDate(previous, current)) {
    return 0;
  }
  return previous.sequenceNo + 1;
}

const hasSameFileNameAndDate = (previous, current) => {
  return previous.baseName === current.baseName &&
          previous.effectiveDate.getTime() === current.effectiveDate.getTime();
}

const setDisplayName = (fileInfo) => {
  fileInfo.displayName = removeTimeFromDisplayName(fileInfo);

  if (fileInfo.sequenceNo === undefined || fileInfo.sequenceNo < 0) {
    return;
  }

  if (fileInfo.sequenceNo > 0) {
    fileInfo.displayName = '...';
  }
}

const removeTimeFromDisplayName = (fileInfo) => {
  if(!fileInfo.effectiveTime) {
    return fileInfo.name;
  }
  const timeAsInFileName = fileInfo.effectiveTime.replace(':', '.');
  const timePos = fileInfo.name.indexOf(timeAsInFileName);
  return timePos !== -1 
    ? trimWithMask( fileInfo.name.replace(` - ${timeAsInFileName}`, ''), '- ' ) 
    : fileInfo.name;
}
