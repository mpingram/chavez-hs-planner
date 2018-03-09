import {expect} from "chai";

import HSReqFilter from "../../../../../src/shared/types/hs-req-filter";
import {combine} from "../../../../../src/shared/util/req-fn-builders/filters";

const succeed: HSReqFilter = (student, program) => true;
const fail: HSReqFilter = (student, program) => false;
const s = {};
const p = {};

describe("combine filters function", () => {
  it("should create a filter that only returns true if all filters return true", () => {
    const combined = combine(succeed, succeed, succeed);
    expect(combined(s,p)).to.equal(true);
  });

  it("should create a filter that returns false if any filter fails", () => {
    const combined = combine(succeed, fail, succeed);
    expect(combined(s,p)).to.equal(false);
  });

});
