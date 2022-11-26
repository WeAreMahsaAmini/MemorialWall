import fs from 'fs';
import { google } from 'googleapis';
import { extension } from 'mime-types';
import { GoogleAuth } from 'google-auth-library';

const auth = new GoogleAuth({
  keyFilename: './key.json',
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    ' https://www.googleapis.com/auth/drive',
  ],
});
const sheets = google.sheets('v4');
const service = google.drive({ version: 'v3', auth });

const spreadsheetId = process.env.SHEET_ID ?? '';

export const get = async (range: string) => {
  const res = await sheets.spreadsheets.values.get({
    auth,
    range,
    spreadsheetId,
  });

  const rows = res.data.values;

  return rows;
};

export const batchGet = async (ranges: string[]) => {
  const res = await sheets.spreadsheets.values.batchGet({
    auth,
    ranges,
    spreadsheetId,
  });

  const rows = res.data.valueRanges;

  if (!rows || rows.length === 0) {
    new Error('No data found.');
  }

  return rows;
};

export const update = async (range: string, values: string[][]) => {
  const res = await sheets.spreadsheets.values.update({
    auth,
    range,
    spreadsheetId,
    requestBody: { values },
    valueInputOption: 'USER_ENTERED',
  });

  const rows = res.data;

  return rows;
};

export const getFile = async (fileId: string, title: string) => {
  const file = await service.files.get(
    {
      auth,
      fileId,
      alt: 'media',
    },
    { responseType: 'stream' }
  );

  const fileName =
    title + '--' + fileId + '.' + extension(file.headers['content-type']);

  const fileWrite = fs.createWriteStream('public/images/' + fileName);
  fileWrite.on('finish', function () {
    console.log('downloaded', fileName);
  });

  if (file) {
    file.data
      .on('end', () => {
        console.log('Done');
      })
      .on('error', (err) => {
        console.log('Error', err);
      })
      .pipe(fileWrite);
  }

  return file;
};
