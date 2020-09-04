const SESSION_DATE_REGEX = /(\d{4})(0?[1-9]|1[012])(0?[1-9]|[12][0-9]|3[01])(?!\d)/;
const SESSION_NAME_REGEX = /^.*?(?=_\d)/;

/**
 * @async
 * @param {File} file
 * @returns {String}
 */
export function readFile(file) {
  return new Promise((resolve, reject) => {
    if (file.type !== 'text/plain') {
      reject('Uploaded a non-text file.');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (readerEvt) => {
      const readResult = readerEvt.target.result;
      console.log(`%c☌ ...file "${file.name}" read.`, 'color: #6464ff');
      resolve(readResult);
    }

    fileReader.readAsText(file);
  });
}
// -- session date
/**
 * @params {Files|Array<File>}
 */
export function sortBySessionDate(files) {
  return Array.from(files).sort((fileA, fileB) => {
    const sessionDateA = getDateFromSessionFile(fileA);
    const sessionDateB = getDateFromSessionFile(fileB);
    return sessionDateA < sessionDateB ? -1 : 1;
  });
}
/**
 * @param {File} file
 * @returns {Date}
 */
export function getDateFromSessionFile(file) {
  const foundDate = file.name.match(SESSION_DATE_REGEX);
  if (!foundDate) return;

  const year = foundDate[1];
  const month = foundDate[2];
  const day = foundDate[3];
  return new Date(year, month, day);
}
/**
 * @param {File} file
 * @returns {String}
 */
export function getNameFromSessionFile(file) {
  const fileName = file.name;
  const matches = fileName.match(SESSION_NAME_REGEX) || [];
  return matches[0];
}
/**
 * vaguely copied from https://stackoverflow.com/a/6979777
 * @param {Date} date
 * @returns {String}
 */
export function convertDateToString(date) {
  const fix2 = (n) => ((n < 10) ? '0' + n : n);
  return `${date.getFullYear()}${fix2(date.getMonth() + 1)}${fix2(date.getDate())}`;
}
