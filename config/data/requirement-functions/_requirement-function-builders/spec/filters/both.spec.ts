import {expect} from "chai";

import StudentData from "../../../../../src/shared/types/student-data";
import CPSProgram from "../../../../../src/shared/types/cps-program";

import HSReqFilter from "../../../../../src/shared/types/hs-req-filter";
import {both} from "../../../../../src/shared/util/req-fn-builders/filters";

const succeed: HSReqFilter = (student, program) => true;
const fail: HSReqFilter = (student, program) => false;

const s = {} as StudentData;
const p = {} as CPSProgram;

describe("combine filters function", () => {
  it("should create a filter that only returns true if all filters return true", () => {
    const combined = both(succeed, succeed, succeed);
    expect(combined(s,p)).to.equal(true);
  });

  it("should create a filter that returns false if any filter fails", () => {
    const combined = both(succeed, fail, succeed);
    expect(combined(s,p)).to.equal(false);
  });

});
