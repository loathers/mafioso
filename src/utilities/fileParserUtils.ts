const SESSION_DATE_REGEX =
  /(\d{4})(0?[1-9]|1[012])(0?[1-9]|[12][0-9]|3[01])(?!\d)/;
const SESSION_NAME_REGEX = /^.*?(?=_\d)/;

/**
 * @async
 * @param {File} file
 * @returns {String}
 */
export function readFile(file: File) {
  return new Promise<string | undefined | null>((resolve, reject) => {
    if (file.type !== "text/plain") {
      reject("Uploaded a non-text file.");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (readerEvt) => {
      // Because we use readAsText, this is not ArrayBuffer
      const readResult = readerEvt.target?.result as string | null;
      console.log(`%c☌ ...file "${file.name}" read.`, "color: #6464ff");
      resolve(readResult);
    };

    fileReader.readAsText(file);
  });
}

export function sortBySessionDate(files: File[] | FileList) {
  return Array.from(files).sort((fileA, fileB) => {
    const sessionDateA = getDateFromSessionFile(fileA) ?? 0;
    const sessionDateB = getDateFromSessionFile(fileB) ?? 0;
    return sessionDateA < sessionDateB ? -1 : 1;
  });
}

export function getDateFromSessionFile(file: File) {
  const foundDate = file.name.match(SESSION_DATE_REGEX);
  if (!foundDate) return;

  const year = Number(foundDate[1]);
  const month = Number(foundDate[2]);
  const day = Number(foundDate[3]);
  return new Date(year, month, day);
}

export function getNameFromSessionFile(file: File) {
  if (!file) return undefined;

  const fileName = file.name;
  const matches = fileName.match(SESSION_NAME_REGEX) || [];
  return matches[0];
}
/**
 * vaguely copied from https://stackoverflow.com/a/6979777

 */
export function convertDateToString(date: Date) {
  const fix2 = (n: number) => (n < 10 ? "0" + n : n);
  return `${date.getFullYear()}${fix2(date.getMonth() + 1)}${fix2(
    date.getDate(),
  )}`;
}
