import { get, update } from 'utils/api';

const ranges = [
  ['A', 2],
  ['F', 33],
];

const sheetRange = `Provinces!${
  ranges[0][0] +
  String(ranges[0][1]) +
  ':' +
  ranges[1][0] +
  String(ranges[1][1])
}`;

export const getProvinces = async () => {
  const rows = await get(sheetRange);

  return { rows, ranges };
};

export const updateProvinces = async (values: string[][]) => {
  await update(sheetRange, values);

  return true;
};