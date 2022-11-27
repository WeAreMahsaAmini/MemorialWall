import { useRef, useState } from 'react';

import Image from 'components/MyImage';

import { getImage } from 'utils';
import { useData } from 'providers/data-provider';

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
  const { getCity, getProvince } = useData();

  const [city] = useState(getCity(person.city));
  const [province] = useState(getProvince(city.province_id));

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
          alt=""
          width={60}
          height={88}
          src={getImage(person.image)}
          className="flex-none rounded-md bg-slate-100"
        />
      </div>
      <div className="min-w-0 relative flex-auto">
        <h2 className="font-semibold text-slate-900 truncate pr-20">
          {person.name + ' ' + person.family} -{' '}
          <span className="font-vazirmatn">
            {person.name_persian + ' ' + person.family_persian}
          </span>
        </h2>
        <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
          {person.age && (
            <div className="absolute top-0 right-0 flex items-center space-x-1">
              <dd>Age: {person.age}</dd>
            </div>
          )}
          <ul>
            {person.date && <li>Date: {person.date}</li>}
            <li>
              {city && (
                <>
                  City: {province && province.name} / {city.name}
                  <span className="ml-1 font-vazirmatn">
                    ({city.name_persian})
                  </span>
                </>
              )}
            </li>
          </ul>
        </dl>
      </div>
    </div>
  );
}
