import { useContext, PropsWithChildren, createContext, useState } from 'react';

import peopleData from '/public/data/people.zip.json' assert { type: 'JSON' };
import citiesData from '/public/data/cities.zip.json' assert { type: 'JSON' };
import provincesData from '/public/data/provinces.zip.json' assert { type: 'JSON' };

import type { Person, City, Province } from 'types';

export const DataContext = createContext({
  people: [] as Person[],
  cities: [] as City[],
  provinces: [] as Province[],
  getCity: (id: City['id']): City => {
    return { id } as City;
  },
  getProvince: (id: Province['id']): Province => {
    return { id } as Province;
  },
});

export const DataProvider = ({ children }: PropsWithChildren) => {
  const [people] = useState<Person[]>(peopleData);
  const [cities] = useState<City[]>(citiesData);
  const [provinces] = useState<Province[]>(provincesData);

  const getCity = (id: City['id']): City => {
    return cities.find((city) => city.id === id)!;
  };

  const getProvince = (id: Province['id']): Province => {
    return provinces.find((province) => province.id === id)!;
  };

  return (
    <DataContext.Provider
      value={{
        people,
        cities,
        provinces,
        getCity,
        getProvince,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const { people, cities, provinces, getCity, getProvince } =
    useContext(DataContext);

  return {
    people,
    cities,
    provinces,
    getCity,
    getProvince,
  };
};

export default DataContext;
