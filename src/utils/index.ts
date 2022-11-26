import { Timing, Province } from 'types';

export const getImage = (image?: string) => {
  return image ?? '/images/person.jpeg';
};

export const isDataNew = (row: Timing) => {
  return (
    !row.updated_at || !row.uploaded_at || row.updated_at > row.uploaded_at
  );
};

export const isLocalOld = (province: Province, localProvince?: Province) => {
  return (
    !localProvince ||
    (localProvince && localProvince.updated_at < province.updated_at)
  );
};
export const applyLastUploaded = (province: Province) => {
  const date = new Date().toLocaleString();

  province.uploaded_at = date;
  if (!province.updated_at) {
    province.updated_at = date;
  }

  return province;
};

export { default as getCityProvince } from './getCityProvince';
