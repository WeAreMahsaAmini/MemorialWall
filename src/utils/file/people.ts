import { readFile, writeFile } from './file';

import type { Person } from 'types';

let people: Person[];

export const readPeople = async () => {
  people = (await readFile('people')) as Person[];
};

export const findPerson = (id: string) => {
  return people.find((pe) => pe.id === id);
};

export const addPerson = (person: Person) => {
  people.push(person);
};

export const updatePerson = (person: Person) => {
  people = people.map((pe) => (pe.id === person.id ? person : pe));
};

export const writePeople = () => {
  writeFile('people.zip', JSON.stringify(people));
  writeFile('people', JSON.stringify(people, null, 2).replace(/\\n/g, ''));
};
