import fs from 'fs';

type dataTypes = 'people' | 'provinces' | 'cities';

const fileUrl = (type: dataTypes) => process.cwd() + `/data/${type}.json`;

export const readFile = async (type: dataTypes) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileUrl(type), (error, data) => {
      if (error) reject(error);

      const buffer = Buffer.from(data);

      resolve(JSON.parse(buffer.toString()));
    });
  });
};

export const writeFile = (type: dataTypes, file: string) => {
  fs.writeFileSync(fileUrl(type), file);
};
