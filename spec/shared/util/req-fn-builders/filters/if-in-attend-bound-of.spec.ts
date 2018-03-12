import {expect} from "chai";

import {ifInAttendBoundOf} from "../../../../../src/shared/util/req-fn-builders/filters";

describe("inAttendBoundOf hsReqFilter", () => {
  // NOTE these tests are based on real Chicago addresses and school attendance bounds as of SY1718. 
  // Changes to CPS school attendance bounds may make these tests inaccurate over time.

  it("should return a filter that returns true if a student is inside any of the attendance bounds of the schools passed to it", () => {
    // check hp address geocode and kenwood attend bound
  });

  it("should return a filter that returns false if a student is outside all of the attendance bounds of the schools passed to it", () => {
    // check elsewhere address geocode and something else
  });


  describe("error handling and uninitialized values", () => {
    it("should return false when passed a student with uninitialized location property", () => {

    });

    // TODO -- or should throw?
    it("should return a filter that returns false if all school ids passed to it do not have attendance bounds", () => {

    });

  });
});



