import fs from 'fs';

type Models = 'people' | 'provinces' | 'cities';

type DataTypes = Models | `${Models}.zip`;

const fileUrl = (type: DataTypes) =>
  process.cwd() + `/public/data/${type}.json`;

export const readFile = async (type: DataTypes) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileUrl(type), (error, data) => {
      if (error) reject(error);

      const buffer = Buffer.from(data);

      resolve(JSON.parse(buffer.toString()));
    });
  });
};

export const writeFile = (type: DataTypes, file: string) => {
  fs.writeFileSync(fileUrl(type), file);
};
