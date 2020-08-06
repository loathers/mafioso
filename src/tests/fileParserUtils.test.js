import assert from 'assert';

import * as fileParserUtils from 'utilities/fileParserUtils';

const mockFileA = new File([], 'dextrial_20200801.txt');
const mockFileB = new File([], 'dextrial_20200731.txt');
const mockFileC = new File([], 'dextrial_20200730.txt');

test('fileParserUtils.getSessionDateFromFile(): returns correct date from filename', () => {
  const sessionDate = fileParserUtils.getSessionDateFromFile(mockFileA);
  expect(sessionDate.getFullYear()).toEqual(2020);
  expect(sessionDate.getMonth()).toEqual(8);
  expect(sessionDate.getDate()).toEqual(1);
});