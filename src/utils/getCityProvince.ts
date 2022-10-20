import type { City } from 'types';

import { cities, provinces } from 'data';

const getCityProvince = (cityId: City['id']) => {
  const city = cities.find((c) => cityId === c.id);
  const province = provinces.find((p) => city?.province_id === p.id);

  return { city, province };
};

export default getCityProvince;
