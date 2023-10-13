export default function download(
  content: BlobPart,
  fileName: string,
  contentType: string,
) {
  const file = createBlob(content, contentType);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

export function createBlob(content: BlobPart, contentType: string) {
  return new Blob([content], { type: contentType });
}
