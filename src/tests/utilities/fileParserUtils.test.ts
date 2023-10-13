import { test, expect } from "vitest";

import * as fileParserUtils from "../../utilities/fileParserUtils";
import { expectDefined } from "../lib";

const mockFileA = new File([], "dextrial_20200801.txt");
const mockFileB = new File([], "dextrial_20200731.txt");
const mockFileC = new File([], "dextrial_20200730.txt");
const mockFileD = new File([], "c00lest_one_20200730.txt");

test("fileParserUtils.getDateFromSessionFile(): returns correct date from filename", () => {
  const sessionDate = fileParserUtils.getDateFromSessionFile(mockFileA);
  expectDefined(sessionDate);
  expect(sessionDate.getFullYear()).toBe(2020);
  expect(sessionDate.getMonth()).toBe(8);
  expect(sessionDate.getDate()).toBe(1);
});

test("fileParserUtils.getDateFromSessionFile(): handles filename with a number", () => {
  const sessionDate = fileParserUtils.getDateFromSessionFile(mockFileD);
  expectDefined(sessionDate);
  expect(sessionDate.getFullYear()).toBe(2020);
  expect(sessionDate.getMonth()).toBe(7);
  expect(sessionDate.getDate()).toBe(30);
});

test("fileParserUtils.sortBySessionDate(): handles sorting out of order sessions", () => {
  const sortedSessions = fileParserUtils.sortBySessionDate([
    mockFileA,
    mockFileB,
    mockFileC,
  ]);
  expect(sortedSessions[0].name).toBe("dextrial_20200730.txt");
  expect(sortedSessions[1].name).toBe("dextrial_20200731.txt");
  expect(sortedSessions[2].name).toBe("dextrial_20200801.txt");
});

test("fileParserUtils.getNameFromSessionFile(): returns string of name", () => {
  const userName = fileParserUtils.getNameFromSessionFile(mockFileA);
  expect(userName).toBe("dextrial");

  const userName2 = fileParserUtils.getNameFromSessionFile(mockFileD);
  expect(userName2).toBe("c00lest_one");

  const crazyNameFile = new File(
    [],
    "c00lest_one__kingdom_of_lorfing_20200730.txt",
  );
  const userName3 = fileParserUtils.getNameFromSessionFile(crazyNameFile);
  expect(userName3).toBe("c00lest_one__kingdom_of_lorfing");
});
