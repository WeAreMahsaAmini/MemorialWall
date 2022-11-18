import Image from 'components/MyImage';
import { getCityProvince } from 'utils';

import type { Person } from 'types';

const Modal = ({ person }: { person: Person }) => {
  const { city, province } = getCityProvince(person.city);

  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 overflow-scroll">
      <div className="p-5 flex flex-col justify-center md:flex-row">
        <div className="text-center flex justify-center flex-auto sm:w-1/4 sm:inline">
          <Image
            width={360}
            height={510}
            src={person.image}
            alt={`${person.name} ${person.family} - ${
              person.name_persian + ' ' + person.family_persian
            }`}
          />
        </div>
        <div className="min-w-0 relative text-white flex-auto sm:w-3/4">
          <div className="overflow-hidden bg-white shadow">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium font-vazirmatn leading-6 text-gray-900">
                {person.name + ' ' + person.family} -{' '}
                {person.name_persian + ' ' + person.family_persian}
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Age</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {person.age}
                  </dd>
                </div>
                {person.date && (
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Date</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {person.date}
                    </dd>
                  </div>
                )}
                {person.birthdate && (
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Birthdate
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {person.birthdate}
                    </dd>
                  </div>
                )}

                {city && (
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">City</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {province && province.name} / {city.name}
                      <span className="ml-1 font-vazirmatn">
                        ({city.name_persian})
                      </span>
                    </dd>
                  </div>
                )}

                {person.description_fa && (
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Description
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 fa font-vazirmatn">
                      {`${person.description_fa.join('')})`}
                    </dd>
                  </div>
                )}
                {person.description && (
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Description
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {`${person.description.join('')})`}
                    </dd>
                  </div>
                )}
                {person.references && (
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      References
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ul
                        role="list"
                        className="divide-y divide-gray-200 rounded-md border border-gray-200"
                      >
                        {Object.entries(person.references).map((ref) => (
                          <li
                            className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                            key={ref[0]}
                          >
                            <div className="flex w-0 flex-1 items-center">
                              <span className="ml-2 w-0 flex-1 truncate">
                                {ref[0]}
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href={ref[1]}
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Visit
                              </a>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
