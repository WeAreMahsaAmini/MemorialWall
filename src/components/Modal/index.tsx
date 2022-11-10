import Image from 'components/MyImage';
import { getCityProvince } from 'utils';

import type { Person } from 'types';

const Modal = ({ person }: { person: Person }) => {
  const { city, province } = getCityProvince(person.city);

  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 overflow-scroll">
      <div className="p-5 flex flex-col justify-center md:flex-row">
        <div className="text-center">
          <Image
            width={360}
            height={510}
            src={person.image}
            alt={`${person.name} ${person.family} - ${
              person.name_persian + ' ' + person.family_persian
            }`}
          />
        </div>
        <div className="min-w-0 relative flex-auto bg-gray-700 p-5 text-white">
          <h2 className="font-semibold truncate pr-20">
            {person.name + ' ' + person.family} -{' '}
            {person.name_persian + ' ' + person.family_persian}
          </h2>
          <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
            <ul className="inline-block">
              {<li>Age: {person.age}</li>}
              {person.date && <li>Date: {person.date}</li>}
              {person.birthdate && <li>Birthdate: {person.birthdate}</li>}
              {city && (
                <li>
                  {`City: ${province && province.name} / ${city.name} (${
                    city.name_persian
                  })`}
                </li>
              )}
            </ul>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Modal;
