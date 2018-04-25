import {expect} from "chai";

import StudentData from "../../../../../src/shared/types/student-data";
import CPSProgram from "../../../../../src/shared/types/cps-program";

import HSReqFilter from "../../../../../src/shared/types/hs-req-filter";
import {either} from "../../../../../src/shared/util/req-fn-builders/filters";

const succeed: HSReqFilter = (student, program) => true;
const fail: HSReqFilter = (student, program) => false;

const s = {} as StudentData;
const p = {} as CPSProgram;

describe("either filter composer", () => {
  it("should create a filter that returns true if all filters return true", () => {
    const combined = either(fail, succeed, succeed);
    expect(combined(s,p)).to.equal(true);
  });

  it("should create a filter that returns true if some filters return false and some filters return true", () => {
    const combined = either(fail, succeed, succeed);
    expect(combined(s,p)).to.equal(true);
  });

  it("should create a filter that returns false if all filters fail", () => {
    const combined = either(fail, fail, fail);
    expect(combined(s,p)).to.equal(false);
  });
});
