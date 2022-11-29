import type { NextApiRequest, NextApiResponse } from 'next';

import {
  addCity as addLocalCity,
  findCity as findLocalCity,
  readCities as readLocalCities,
  writeCities as writeLocalCities,
  updateCity as updateLocalCities,
  readProvinces as readLocalProvinces,
  findProvince,
} from 'utils/file';
import { getCities, updateCities } from 'utils/data';
import { isDataNew, isLocalOld, applyLastUploaded } from 'utils';

import type { City } from 'types';

type Response = {
  updates: City[];
  new: City[];
};

const fetchPeople = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const cities: City[] = [];
  const updates: City[] = [];
  const newCities: City[] = [];

  await readLocalCities();
  await readLocalProvinces();

  const { rows: citiesInSheet } = await getCities();
  if (!citiesInSheet) {
    throw 'No Data!';
  }

  citiesInSheet.forEach(async (p) => {
    if (!findProvince(p[5])) {
      throw 'province ' + p[5] + ' not found!';
    }

    const city: City = {
      id: p[2],
      name: p[3],
      name_persian: p[4],
      province_id: p[5],
      updated_at: p[0],
      uploaded_at: p[1],
    };

    const localCity = findLocalCity(city.id);

    if (isDataNew(city) || isLocalOld(city, localCity)) {
      applyLastUploaded(city);

      if (localCity) {
        updates.push(city);
        updateLocalCities(city);
      } else {
        newCities.push(city);
        addLocalCity(city);
      }
    }

    cities.push(city);
  });

  if (updates.length || newCities.length) {
    await updateCities(cities.map((p) => [p.updated_at, p.uploaded_at]));

    writeLocalCities();
  }

  res.status(200).json({ new: newCities, updates });
};

export default fetchPeople;
