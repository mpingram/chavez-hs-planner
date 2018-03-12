import {expect} from "chai";
import StudentData from "../../../../../src/shared/types/student-data";
import CPSProgram from "../../../../../src/shared/types/cps-program";

import {CPS_PROXIMITY_LOTTERY_RADIUS_MI} from "../../../../../src/shared/constants";

import {ifInProximity} from "../../../../../src/shared/util/req-fn-builders/filters";

describe("ifInProximity hsReqFilter", () => {

  if(CPS_PROXIMITY_LOTTERY_RADIUS_MI != 2.5) {
    // FIXME what am I saying? I need to include lat/long distance calculations anyway...ugh
    throw new Error("ifInProximity tests are based on CPS_PROXIMITY_LOTTERY_RADIUS_MI of 2.5mi. Update these tests with new coordinates.");
  }

  let s: StudentData;
  let p: CPSProgram;
  beforeEach( () => {
    s = {
      location: {
        address: "",
        tier: "",
        geo: {
          latitude: 0,
          longitude: 0
        }
      }
    } as StudentData;

    p = {
      School_ID: "",
      School_Latitude: "",
      School_Longitude: "",
    } as CPSProgram;
  });


  it("should return true when comparing a student and a program which are within the constant CPS_PROXIMITY_LOTTERY_RADIUS_MI of each other", () => {
    // KENWOOD HS
    p.School_ID = "609746";
    p.School_Latitude = "41.803772";
    p.School_Longitude = "-87.590421";

    const studentLat = parseFloat(p.School_Latitude) * MILE_LATITUDE_CONVERSION_FACTOR 

  });

  it("should return false when comparing a student and a program which are outside the constant CPS_PROXIMITY_LOTTERY_RADIUS_MI of each other", () => {
    // KENWOOD HS
    p.School_ID = "609746";
    p.School_Latitude = "41.803772";
    p.School_Longitude = "-87.590421";

  });

  it("should return false when passed a student with an undefined or uninitialized location property", () => {
    it("should return false if passed a student with an uninitialized location property", () => {
      // KENWOOD HS
      p.School_ID = "609746";
      p.School_Latitude = "41.803772";
      p.School_Longitude = "-87.590421";

      s.location = undefined;
      expect(ifInProximity(s,p)).to.equal(false);

      s.location = null;
      expect(ifInProximity(s,p)).to.equal(false);

      s.location = {address: "", tier: "", geo: undefined};
      expect(ifInProximity(s,p)).to.equal(false);

      s.location = {address: "", tier: "", geo: {latitude: null, longitude: null}}
      expect(ifInProximity(s,p)).to.equal(false);
    });

  });

});
