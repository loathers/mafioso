/**
 * @link https://stackoverflow.com/questions/34156282/how-do-i-save-json-to-local-text-file
 *
 * @param {*} content
 * @param {String} fileName
 * @param {String} contentType
 */
export default function download(content, fileName, contentType) {
  const file = createBlob(content, contentType);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
/**
 * @param {*} content
 * @param {String} contentType
 * @returns {Blob}
 */
export function createBlob(content, contentType) {
  return new Blob([content], {type: contentType});
}
