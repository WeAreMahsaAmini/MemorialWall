import { readFile, writeFile } from './file';

import type { City } from 'types';

let cities: City[];

export const readCities = async () => {
  cities = (await readFile('cities')) as City[];
};

export const findCity = (id: string) => {
  if (!cities) {
    throw 'Cities are not loaded!';
  }

  return cities.find((ct) => ct.id === id);
};

export const addCity = (city: City) => {
  cities.push(city);
};

export const updateCity = (city: City) => {
  cities = cities.map((ct) => (ct.id === city.id ? city : ct));
};

export const writeCities = () => {
  writeFile('cities.zip', JSON.stringify(cities));
  writeFile('cities', JSON.stringify(cities, null, 2).replace(/\\n/g, ''));
};
