import {expect} from "chai";

import {everyone} from "../../../../../src/shared/util/req-fn-builders/filters";

const s = {};
const p = {};

describe("everyone filter function", () => {
  it("should always return true, no matter the input", () => {
    expect(everyone(s,p)).to.equal(true);
    expect(everyone(null, null)).to.equal(true);
  });
});

