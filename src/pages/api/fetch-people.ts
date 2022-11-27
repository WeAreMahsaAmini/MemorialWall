import type { NextApiRequest, NextApiResponse } from 'next';

import {
  addPerson as addLocalPerson,
  findPerson as findLocalPerson,
  readPeople as readLocalPeople,
  writePeople as writeLocalPeople,
  updatePerson as updateLocalPeople,
  readCities as readLocalCities,
  findCity,
} from 'utils/file';
import { getFile } from 'utils/api';
import { getPeople, updatePeople } from 'utils/data';
import { isDataNew, isLocalOld, applyLastUploaded } from 'utils';

import type { Person } from 'types';

type Response = {
  updates: Person[];
  new: Person[];
};

const fetchPeople = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const people: Person[] = [];
  const updates: Person[] = [];
  const newPeople: Person[] = [];

  await readLocalPeople();
  await readLocalCities();

  const { rows: peopleInSheet } = await getPeople();
  if (!peopleInSheet) {
    throw 'No Data!';
  }

  for (const row of peopleInSheet) {
    if (!findCity(row[9])) {
      throw 'city ' + row[9] + ' not found!';
    }

    let image: Person['image'];
    const media: Person['media'] = {};
    const references: Person['references'] = {};
    const hashtags = row[5] ? row[5].split(',') : [];
    const description = row[15] ? row[15].split(';') : [];
    const description_fa = row[16] ? row[16].split(';') : [];
    const isValidated = row[14] ? row[14] === 'TRUE' : false;

    if (row[17]) {
      row[17].split(';;').map((cell: string) => {
        const ref = cell.split('==');

        references[ref[0]] = ref[1];
      });
    }

    if (row[18]) {
      row[18].split(';;').map((cell: string) => {
        const ref = cell.split('==');

        media[ref[0]] = ref[1];
      });
    }

    if (row[12]) {
      const imgId = row[12]
        .replace('https://drive.google.com/file/d/', '')
        .replace('/view?usp=sharing', '');

      const img = await getFile(imgId, row[2]);

      image = img.path;
    }

    const person: Person = {
      image,
      media,
      hashtags,
      id: row[2],
      references,
      description,
      isValidated,
      age: row[8],
      name: row[3],
      city: row[9],
      date: row[10],
      description_fa,
      family: row[4],
      reason: row[11],
      birthdate: row[13],
      updated_at: row[0],
      uploaded_at: row[1],
      name_persian: row[6],
      family_persian: row[7],
    };

    const localPerson = findLocalPerson(person.id);

    if (isDataNew(person) || isLocalOld(person, localPerson)) {
      applyLastUploaded(person);

      if (localPerson) {
        updates.push(person);
        updateLocalPeople(person);
      } else {
        newPeople.push(person);
        addLocalPerson(person);
      }
    }

    people.push(person);
  }

  if (updates.length || newPeople.length) {
    await updatePeople(people.map((p) => [p.updated_at, p.uploaded_at]));
    writeLocalPeople();
  }

  res.status(200).json({ new: newPeople, updates });
};

export default fetchPeople;
