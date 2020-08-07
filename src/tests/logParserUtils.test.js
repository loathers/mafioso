import assert from 'assert';

import {DIFFICULTY_MAP, PATH_MAP} from 'constants/ABBREVIATION_MAP';
import * as logParserUtils from 'utilities/logParserUtils';

test('logParserUtils.parseDifficultyName(): parses the three different difficulty names', () => {
  const HCMockText = 'Ascension #111:\nHardcore Low Key Summer Pastamancer\nWallaby';
  expect(
    logParserUtils.parseDifficultyName(HCMockText)
  ).toBe('Hardcore');

  const SCMockText = 'Ascension #111:\nNormal Low Key Summer Pastamancer\nWallaby';
  expect(
    logParserUtils.parseDifficultyName(SCMockText)
  ).toBe('Normal');

  const CASMockText = 'Ascension #111:\nCasual Low Key Summer Pastamancer\nWallaby';
  expect(
    logParserUtils.parseDifficultyName(CASMockText)
  ).toBe('Casual');
});

test('logParserUtils.parsePathName(): parses a couple different paths', () => {
  const LKSMockText = 'Ascension #111:\nNormal Low Key Summer Pastamancer\nWallaby';
  expect(logParserUtils.parsePathName(LKSMockText)).toBe('Low Key Summer');

  const OXYMockText = 'Ascension #111:\nHardcore Oxygenarian Turtle Tamer\Mongoose';
  expect(logParserUtils.parsePathName(OXYMockText)).toBe('Oxygenarian');
});

test('logParserUtils.createPathLabel(): creates the label as expected', () => {
  const LKSMockText = 'Ascension #111:\nNormal Low Key Summer Pastamancer\nWallaby';
  expect(logParserUtils.createPathLabel(LKSMockText)).toBe('SC_LKS');

  const OXYMockText = 'Ascension #111:\nHardcore Oxygenarian Pastamancer\Mongoose';
  expect(logParserUtils.createPathLabel(OXYMockText)).toBe('HC_OXY');
});