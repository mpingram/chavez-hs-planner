import {expect} from "chai";

import StudentData from "../../../src/shared/types/student-data";
import Gender from "../../../src/shared/enums/gender";

import {calculateSEPoints, calculateIBPoints} from "../../../src/shared/util/hs-calc-utils";

const basicStudentData: StudentData = {
  location: {
    address: "4747 S Marshfield Ave, Chicago IL",
    geo: {latitude: 0, longitude: 0},
    tier: "1"
  },
  ell: false,
  iep: false,
  gradeLevel: 7,
  attendancePercentage: 93,
  currESProgramID: null,
  gender: Gender.MALE,
  gpa: 3.5,
  nweaPercentileMath: 94,
  nweaPercentileRead: 3,
  prevGradeLevel: 6,
  seTestPercentile: 50,
  siblingHSProgramIDs: [],
  subjGradeMath: 28,
  subjGradeSci: 45,
  subjGradeSocStudies: 49,
  subjGradeRead: 99,
};

// FIXME: need to rewrite tests, look up scores on rubric

xdescribe("calculateSEPoints", () => {

  it("should return accurate SE scores according to rubric", () => {
  });

  it("should never return SE scores higher than 900", () => {
  });

});

xdescribe("calculateIBPoints", () => {

  it("should return accurate IB scores according to rubric", () => {
  });

  it("should never return IB scores higher than 950", () => {
  });

});
