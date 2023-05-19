export const saveFile = (response: Blob, filename: string) => {
  const downloadUrl = URL.createObjectURL(response);
  const element = window.document.createElement("a");

  element.setAttribute("href", downloadUrl);
  element.setAttribute("download", filename);
  element.style.display = "none";

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);

  setTimeout(() => URL.revokeObjectURL(downloadUrl), 100);
};
