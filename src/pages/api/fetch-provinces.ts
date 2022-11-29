import type { NextApiRequest, NextApiResponse } from 'next';

import {
  addProvince as addLocalProvince,
  findProvince as findLocalProvince,
  readProvinces as readLocalProvinces,
  writeProvinces as writeLocalProvinces,
  updateProvince as updateLocalProvinces,
} from 'utils/file';
import { getProvinces, updateProvinces } from 'utils/data';
import { isDataNew, isLocalOld, applyLastUploaded } from 'utils';

import type { Province } from 'types';

type Response = {
  updates: Province[];
  new: Province[];
};

const fetchPeople = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const updates: Province[] = [];
  const provinces: Province[] = [];
  const newProvinces: Province[] = [];

  await readLocalProvinces();

  const { rows: provincesInSheet } = await getProvinces();
  if (!provincesInSheet) {
    throw 'No Data!';
  }

  provincesInSheet.forEach((p) => {
    const province: Province = {
      id: p[2],
      name: p[3],
      name_persian: p[4],
      updated_at: p[0],
      uploaded_at: p[1],
    };

    const localProvince = findLocalProvince(province.id);

    if (isDataNew(province) || isLocalOld(province, localProvince)) {
      applyLastUploaded(province);

      if (localProvince) {
        updates.push(province);
        updateLocalProvinces(province);
      } else {
        newProvinces.push(province);
        addLocalProvince(province);
      }
    }

    provinces.push(province);
  });

  if (updates.length || newProvinces.length) {
    await updateProvinces(provinces.map((p) => [p.updated_at, p.uploaded_at]));

    writeLocalProvinces();
  }

  res.status(200).json({ new: newProvinces, updates });
};

export default fetchPeople;
