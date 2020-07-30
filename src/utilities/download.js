/**
 * @link https://stackoverflow.com/questions/34156282/how-do-i-save-json-to-local-text-file
 *
 * @param {*} content
 * @param {String} fileName
 * @param {String} contentType
 */
export default function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}