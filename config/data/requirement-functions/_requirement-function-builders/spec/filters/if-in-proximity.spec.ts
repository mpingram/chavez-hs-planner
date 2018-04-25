import {expect} from "chai";
import StudentData from "../../../../../src/shared/types/student-data";
import CPSProgram from "../../../../../src/shared/types/cps-program";

import { CPS_PROXIMITY_LOTTERY_RADIUS_METERS } from "../../../../../src/shared/constants";
import { computeDestinationPoint } from "geolib";

import {ifInProximity} from "../../../../../src/shared/util/req-fn-builders/filters";


describe("ifInProximity hsReqFilter", () => {

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


  it("should return true when comparing a student and a program which are within the CPS proximity lottery radius of each other", () => {
    // KENWOOD HS
    p.School_ID = "609746";
    p.School_Latitude = "41.803772";
    p.School_Longitude = "-87.590421";

    // compute a point slightly inside CPS_PROXIMITY_LOTTERY_RADIUS
    const schoolGeo = {
      latitude: parseFloat(p.School_Latitude), 
      longitude: parseFloat(p.School_Longitude)
    };
    const DISTANCE_OFFSET = 100; // meters
    const distance = CPS_PROXIMITY_LOTTERY_RADIUS_METERS - DISTANCE_OFFSET;
    const bearing = 0;
    const destination_geo = computeDestinationPoint(schoolGeo, distance, 0);
    s.location.geo = {
      latitude: destination_geo.latitude,
      longitude: destination_geo.longitude 
    };

    // student should be within proximity
    expect(ifInProximity(s, p)).to.eq(true);
  });

  it("should return false when comparing a student and a program which are outside the CPS proximity lottery radius of each other", () => {
    // KENWOOD HS
    p.School_ID = "609746";
    p.School_Latitude = "41.803772";
    p.School_Longitude = "-87.590421";

    // compute a point slightly outside CPS_PROXIMITY_LOTTERY_RADIUS
    const schoolGeo = {
      latitude: parseFloat(p.School_Latitude), 
      longitude: parseFloat(p.School_Longitude)
    };
    const DISTANCE_OFFSET = 100; // meters
    const distance = CPS_PROXIMITY_LOTTERY_RADIUS_METERS + DISTANCE_OFFSET; 
    const bearing = 0;
    const destination_geo = computeDestinationPoint(schoolGeo, distance, 0);
    s.location.geo = {
      latitude: destination_geo.latitude,
      longitude: destination_geo.longitude 
    };

    // student should not be within proximity
    expect(ifInProximity(s, p)).to.eq(false);
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
