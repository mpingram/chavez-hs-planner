import {expect} from "chai";

import StudentData from "../../../../../src/shared/types/student-data";
import CPSProgram from "../../../../../src/shared/types/cps-program";

import {everyone} from "../../../../../src/shared/util/req-fn-builders/filters";

const s = {} as StudentData;
const p = {} as CPSProgram;

describe("everyone filter function", () => {
  it("should always return true, no matter the input", () => {
    expect(everyone(s,p)).to.equal(true);
    expect(everyone(null, null)).to.equal(true);
  });
});

