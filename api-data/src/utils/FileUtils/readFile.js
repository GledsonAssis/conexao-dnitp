import fs from 'fs';

export default async path => new Promise((resolve, reject) => {
  fs.readFile(path, (error, data) => {
    if (error) {
      reject(error);
    } else {
      resolve(data);
    }
  });
});
