import { readFile, writeFile } from './file';

import type { Province } from 'types';

let provinces: Province[];

export const readProvinces = async () => {
  provinces = (await readFile('provinces')) as Province[];
};

export const findProvince = (id: string) => {
  if (!provinces) {
    throw 'Provinces are not loaded!';
  }

  return provinces.find((pr) => pr.id === id);
};

export const addProvince = (province: Province) => {
  provinces.push(province);
};

export const updateProvince = (province: Province) => {
  provinces = provinces.map((pr) => (pr.id === province.id ? province : pr));
};

export const writeProvinces = () => {
  writeFile(
    'provinces',
    JSON.stringify(provinces, null, 2).replace(/\\n/g, '')
  );
};
