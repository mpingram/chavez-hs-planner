const {expect} = require("chai");

const createProgramData = require("../../../config/build-scripts/create-program-data");

describe("createProgramData", () => {

  describe("handling incorrect input", () => {

    it("should throw if called with more or less than two arguments", () => {

    });

    it("should throw if called with a rawProgramData argument that is not an array of objects with the correct shape", () => {

    });

    it("should throw if called with a programTypeIDConfig argument that is not an array of objects with the correct shape", () => {

    });

    // FIXME this is only true for high school programs ..............
    // It's a good thing I'm writing out this spec, even if I don't end up using it. I need to think this one through.
    it("should throw if a program type is encountered in rawProgramData which is not found in programTypeIDConfig", () => {

    });

  });

  describe("normal operation", () => {
    it("should return an array of objects with the expected shape", () => {

    });

    it("should assign a unique programID property to each program in the output", () => {

    });

    it("should assign a programTypeID to each program type in programTypeIDConfig", () => {

    });

    // NOTE this requirement may change in the future.
    it("should create a valid URL for the High School bound school page", () => {

    });
     
    // NOTE if the wording of this test confuses you, see config/README.txt
    it("should create a unique id for each individual application requirement and selection requirement; these ids should be unique to values of the strings of the applicationReqDescription and selectionReqDescription properties of the outputted data.", () => {

    });

    it("should accurately parse the school latitude and longitude from strings in rawProgramData to floats in the output data", () => {

    });

    it("should rename most properties from rawProgramData to the output program data, without changing their values", () => {

    });

  });

});
