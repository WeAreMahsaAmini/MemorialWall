// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import people from '/public/data/people.zip.json' assert { type: 'JSON' };
import cities from '/public/data/cities.zip.json' assert { type: 'JSON' };
import provinces from '/public/data/provinces.zip.json' assert { type: 'JSON' };

import type { Person, City, Province } from 'types';

const getPeople = () => {
  return people;
};

const getProvinces = () => {
  return provinces;
};

const getCities = () => {
  return cities;
};

export const getData = () => {
  const cities: City[] = getCities();
  const people: Person[] = getPeople();
  const provinces: Province[] = getProvinces();

  return { people, provinces, cities };
};
