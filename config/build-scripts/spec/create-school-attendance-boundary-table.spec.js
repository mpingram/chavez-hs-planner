const {expect} = require("chai");

const createSchoolAttendanceBoundaryTable = require("../../../config/build-scripts/create-school-attendance-boundary-table");

describe("createSchoolAttendanceBoundaryTable", () => {

  /*
   * Handling incorrect inputs.
   * */
  it("should throw if input object does not match expected shape", () => {
    // positive test
    // negative test
  });

  it("should throw if optional coordinatePrecision parameter is passed and is not a number", () => {
    // positive test
    // negative test
  });
  
  /*
   * Normal functioning.
   * */
  it("should produce an object relating school ids to an array of coordinate pairs", () => {
    // positive test
    // negative test
  });

  it("if the coordinatePrecision paramter is passed, should produce an object relating school ids to an array of coordinate pairs, rounded to the number of decimal places in the coordinatePrecision parameter", () => {
    // positive test
    // negative test
  });

  /*
   * Optional coordinate rounding behavior.
   * */
  it("should only round coordinates if a second parameter is passed", () => {
    // expect coordinates to be the same
  });

  it("should round coordinates to the number of decimal places expressed in the second parameter", () => {
    // positive case
    // negative case
  });

  it("should remove duplicated coordinates after rounding, if they exist", () => {
    // positive case
    // negative case
  });

});
