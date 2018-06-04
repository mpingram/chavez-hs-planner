const {expect} = require("chai");

const getProgramTypeID = require("./get-program-type-id");

describe("getProgramTypeID", () => {

  const programTypeIDsConfig = [
    {
      programTypeID: "1",
      name: "1",
      alternateNames: ["one"]
    },
    {
      programTypeID: "2",
      name: "2",
      alternateNames: ["two", "too"]
    }
  ];

  it("should return null if programType cannot be found in programTypeIDsConfig", () => {
    // positive
    expect(getProgramTypeID("willis", programTypeIDsConfig)).to.be.null;
    expect(getProgramTypeID(1, programTypeIDsConfig)).to.be.null;
    // negative
    expect(getProgramTypeID("1", programTypeIDsConfig)).not.to.be.null;
  });

  it("if programType can be found in programTypeIDsConfig, should return matching program type id", () => {
    // positive
    expect(getProgramTypeID("1", programTypeIDsConfig)).to.eq("1");
    expect(getProgramTypeID("one", programTypeIDsConfig)).to.eq("1");
    expect(getProgramTypeID("too", programTypeIDsConfig)).to.eq("2");
    // negative
    expect(getProgramTypeID("2", programTypeIDsConfig)).not.to.eq("1");
  });

  it("should ignore casing and whitespace when matching program types to programIDsConfig", () => {
    // positive
    expect(getProgramTypeID("   1     ", programTypeIDsConfig)).to.eq("1");
    expect(getProgramTypeID("oNe", programTypeIDsConfig)).to.eq("1");
    expect(getProgramTypeID(" TOO ", programTypeIDsConfig)).to.eq("2");
    // negative
    expect(getProgramTypeID("TOO", programTypeIDsConfig)).not.to.eq("1");
  });

  it("should expect the 'alternateNames' field in programTypeIDsConfig to be optional", () => {
    const programTypeIDsConfigNoAltNames = [
      {
        programTypeID: "3",
        name: "Three Dogs"
      }
    ];
    expect(getProgramTypeID("Three Dogs", programTypeIDsConfigNoAltNames)).to.eq("3");
    expect(getProgramTypeID("Four Dogs??", programTypeIDsConfigNoAltNames)).not.to.eq("3");
  });

});
