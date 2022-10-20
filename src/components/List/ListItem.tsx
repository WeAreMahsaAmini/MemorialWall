import { useRef } from 'react';
import Image from 'next/image';

import { getCityProvince } from 'utils';

import type { Person } from 'types';

export default function ListItem({
  person,
  onClick,
}: {
  person: Person;
  // eslint-disable-next-line no-unused-vars
  onClick: (ref: React.MutableRefObject<unknown>, person: Person) => void;
}) {
  const clickRef = useRef(null);
  const { city, province } = getCityProvince(person.city);

  function handleClick() {
    onClick(clickRef, person);
  }

  return (
    <div
      ref={clickRef}
      onClick={handleClick}
      className="flex items-start space-x-6 p-6 w-full cursor-pointer md:w-1/3"
    >
      <div>
        <Image
          src={person.image}
          alt=""
          width="60"
          height="88"
          className="flex-none rounded-md bg-slate-100"
        />
      </div>
      <div className="min-w-0 relative flex-auto">
        <h2 className="font-semibold text-slate-900 truncate pr-20">
          {person.name + ' ' + person.family} - {person.full_name_persian}
        </h2>
        <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
          <div className="absolute top-0 right-0 flex items-center space-x-1">
            <dd>Age: {person.age}</dd>
          </div>
          <ul>
            {person.date && <li>Date: {person.date}</li>}
            {person.birthdate && <li>Birthdate: {person.birthdate}</li>}
            <li>
              {city &&
                `City: ${province && province.name} / ${city.name} (${
                  city.name_persian
                })`}
            </li>
          </ul>
        </dl>
      </div>
    </div>
  );
}
