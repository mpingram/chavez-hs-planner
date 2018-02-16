import {expect} from "chai";
import {
  toLetterGrade,
  GradeConvertErrors
} from "../../../src/shared/util/grade-convert";
import {
  ritToPercentile,
  percentileToRit,
  NWEATestType
} from "../../../src/shared/util/nwea-convert";
import ScoreType from "../../../src/shared/enums/score-type";


describe("toLetterGrade", () => {

  it("should convert A numeric grades to 'A'", () => {
    const score = 91;
    const scoreType = ScoreType.subjGradeMath;
    expect(toLetterGrade(score)).to.equal("A");
  });

  it("should convert B numeric grades to 'B'", () => {
    const score = 81;
    const scoreType = ScoreType.subjGradeMath;
    expect(toLetterGrade(score)).to.equal("B");
  });

  it("should convert C numeric grades to 'C'", () => {
    const score = 71;
    const scoreType = ScoreType.subjGradeMath;
    expect(toLetterGrade(score)).to.equal("C");
  });

  it("should convert D numeric grades to 'D'", () => {
    const score = 61;
    const scoreType = ScoreType.subjGradeMath;
    expect(toLetterGrade(score)).to.equal("D");
  });

  it("should convert F numeric grades to 'F'", () => {
    const score = 51;
    const scoreType = ScoreType.subjGradeMath;
    expect(toLetterGrade(score)).to.equal("F");
  });

  it("should convert numeric grades of value 100 to correct letter grade", () => {
    const score = 100;
    const scoreType = ScoreType.subjGradeRead;
    expect(toLetterGrade(score)).to.equal("A");
  });

  it("should convert numeric grades of value zero to correct letter grade", () => {
    const score = 0;
    const scoreType = ScoreType.subjGradeRead;
    expect(toLetterGrade(score)).to.equal("F");
  });

});
