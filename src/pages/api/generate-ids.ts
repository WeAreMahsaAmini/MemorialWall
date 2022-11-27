import type { NextApiRequest, NextApiResponse } from 'next';

import { get as getSheetData, update as updateSheetData } from 'utils/api';

const fetch = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getSheetData('2022!D2:E300');

  const values: string[][] = [];

  if (data) {
    data.map((row, index) =>
      values.push([
        String(
          row[0].slice(0, 1) + row[1].slice(0, 1) + (index + 2)
        ).toLocaleLowerCase(),
      ])
    );
  }

  await updateSheetData('2022!C2:C300', values);

  res.status(200).json({ values });
};

export default fetch;
