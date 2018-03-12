import {expect} from "chai";

import StudentData from "../../../../../src/shared/types/student-data";
import CPSProgram from "../../../../../src/shared/types/cps-program";

import {ifSiblingAttends} from "../../../../../src/shared/util/req-fn-builders/filters";

describe("ifSiblingAttends requirement function filter", () => {

  let s: StudentData;
  let p: CPSProgram;
  beforeEach( () => {
    s = {} as StudentData;
    p = {} as CPSProgram;
  });
  
  it("should return true when sibling attends the same school building as the program", () => {
    const TARGET_SCHOOL_ID = "00000";
    p.School_ID = TARGET_SCHOOL_ID;
    s.siblingHSProgramIDs = ["", "0010101", "0012981923", "12938102938102938123", TARGET_SCHOOL_ID];

    expect(ifSiblingAttends(s, p)).to.eq(true);
  });

  it("should return false when student does not have a sibling that attends the same school building as the program", () => {
    const TARGET_SCHOOL_ID = "00000";
    p.School_ID = TARGET_SCHOOL_ID;
    s.siblingHSProgramIDs = ["", "0010101", "0012981923", "12938102938102938123", "00"];

    expect(ifSiblingAttends(s, p)).to.eq(false);
  });

  it("should return false if the student's sibling highschool property is uninitialized", () => {
    const TARGET_SCHOOL_ID = "00000";
    p.School_ID = TARGET_SCHOOL_ID;
    s.siblingHSProgramIDs = undefined;

    expect(ifSiblingAttends(s, p)).to.eq(false);

    s.siblingHSProgramIDs = null;
    expect(ifSiblingAttends(s, p)).to.eq(false);

    s.siblingHSProgramIDs = [];
    expect(ifSiblingAttends(s, p)).to.eq(false);
  });

});
