/**
 * Downloads data from local URL
 * @param {string} url The localhost URL where the Blob is located
 * @param {string} name The name suggested for download
 * @param {Blob} blobObject The blob object to download (used for Internet Explorer)
 */
const download = (url: string, name: string, blobObject: Blob) => {
  // if (window.navigator.msSaveBlob && blobObject) {
  // window.navigator.msSaveBlob(blobObject, name);
  // } else {
  const link = document.createElement('a'); // eslint-disable-line no-undef

  link.setAttribute('href', url);
  link.setAttribute('download', name);

  link.click();
  // }
};

const downloadData = (apiRequest: Promise<any>) =>
  apiRequest
    .then((response) => {
      const filenamePromise = () => {
        const contentDisposition = response.headers['content-disposition'];
        const indexOfDoubleQuotes = contentDisposition.indexOf('"');

        return contentDisposition.substring(indexOfDoubleQuotes + 1, contentDisposition.length - 1);
      };

      return Promise.all([filenamePromise(), new Blob([response.data], { type: "text/csv;charset=utf-8,%EF%BB%BF" })]);
    })
    .then(([filename, file]) => {
      file.text().then(item => {
        var link = window.document.createElement("a");
        link.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(item));
        link.setAttribute("download", `${filename}`);
        link.click();
      });
      // const objectUrl = window.URL.createObjectURL(file);
      // download(objectUrl, filename, file);
    })
    .catch((error) => console.error(error)); // eslint-disable-line no-console

export default downloadData;
