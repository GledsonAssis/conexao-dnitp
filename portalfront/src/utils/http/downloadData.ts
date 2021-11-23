/**
 * Downloads data from local URL
 * @param {string} url The localhost URL where the Blob is located
 * @param {string} name The name suggested for download
 * @param {Blob} blobObject The blob object to download (used for Internet Explorer)
 */
const download = (url: string, name: string, blobObject: Blob) => {
  const navidator: any = window?.navigator
  if (navidator.msSaveBlob && blobObject) {
    navidator.msSaveBlob(blobObject, name);
  } else {
    const link = document.createElement('a'); // eslint-disable-line no-undef
    const e = document.createEvent('MouseEvents'); // eslint-disable-line no-undef

    link.setAttribute('href', url);
    link.setAttribute('download', name);

    e.initEvent('click', true, false);
    link.dispatchEvent(e);
  }
};

const downloadData = (apiRequest: Promise<any>) =>
  apiRequest
    .then((response) => {
      const filenamePromise = () => {
        const contentDisposition = response.headers['content-disposition'];
        const indexOfDoubleQuotes = contentDisposition.indexOf('"');

        return contentDisposition.substring(indexOfDoubleQuotes + 1, contentDisposition.length - 1);
      };

      return Promise.all([filenamePromise(), new Blob([response.data])]);
    })
    .then(([filename, file]) => {
      const objectUrl = window.URL.createObjectURL(file);
      download(objectUrl, filename, file);
    })
    .catch((error) => console.error(error)); // eslint-disable-line no-console

export default downloadData;
