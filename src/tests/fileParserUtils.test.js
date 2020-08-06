import assert from 'assert';

import * as fileParserUtils from 'utilities/fileParserUtils';

const mockFileA = new File([], 'dextrial_20200801.txt');
const mockFileB = new File([], 'dextrial_20200731.txt');
const mockFileC = new File([], 'dextrial_20200730.txt');
const mockFileD = new File([], 'c00lest_one_20200730.txt');

test('fileParserUtils.getSessionDateFromFile(): returns correct date from filename', () => {
  const sessionDate = fileParserUtils.getSessionDateFromFile(mockFileA);
  expect(sessionDate.getFullYear()).toBe(2020);
  expect(sessionDate.getMonth()).toBe(8);
  expect(sessionDate.getDate()).toBe(1);
});

test('fileParserUtils.getSessionDateFromFile(): handles filename with a number', () => {
  const sessionDate = fileParserUtils.getSessionDateFromFile(mockFileD);
  expect(sessionDate.getFullYear()).toBe(2020);
  expect(sessionDate.getMonth()).toBe(7);
  expect(sessionDate.getDate()).toBe(30);
});

test('fileParserUtils.sortBySessionDate(): handles sorting out of order sessions', () => {
  const sortedSessions = fileParserUtils.sortBySessionDate([mockFileA, mockFileB, mockFileC]);
  expect(sortedSessions[0].name).toBe('dextrial_20200730.txt');
  expect(sortedSessions[1].name).toBe('dextrial_20200731.txt');
  expect(sortedSessions[2].name).toBe('dextrial_20200801.txt');
});