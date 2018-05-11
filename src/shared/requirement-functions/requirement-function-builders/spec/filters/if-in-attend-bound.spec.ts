import { expect } from "chai";

import {
  StudentData,
  StudentLocation,
  Program
} from "shared/types";

import { ifInAttendBound } from "shared/requirement-functions/requirement-function-builders/filters/if-in-attend-bound";

describe("inAttendBound hsReqFilter", () => {
  // NOTE these tests are based on real Chicago addresses and school attendance bounds as of SY1718. 
  // Changes to CPS school attendance bounds may make these tests inaccurate over time.
  
  let s; // : StudentData
  let p: Program;
  beforeEach( () => {
    s.location = {
      address: "",
      tier: "",
      geo: {
        latitude: 0,
        longitude: 0
      }
    }

    p = {
      schoolID: ""
    } as Program;
  });

  describe("positive tests for attendance bounds", () => {

    it("should return true for an address well within Kenwood HS boundary", () => {
      // geolocation of address near 50th St & Woodlawn -- well within Kenwood boundaries
      s.location.geo = {
        latitude: 41.804759,
        longitude: -87.596650
      };
      // This is the school ID for KENWOOD HS, this neighborhood school
      p.schoolID = "609746";
      expect(ifInAttendBound(s,p)).to.equal(true);
    });

    it("should return true for an address on the edge of Kenwood HS boundary", () => {
      // geolocation of address near 48th & Cottage Grove -- on the border of Kenwood boundaries
      s.location.geo = {
        latitude: 41.807766,
        longitude: -87.606306
      };
      // School ID for KENWOOD HS, as before
      p.schoolID = "609746";
      expect(ifInAttendBound(s,p)).to.equal(true);
    });

    it("should return true for an address inside a concave boundary (SULLIVAN HS)", () => {
      // geolocation of address in northern spike in SULLIVAN HS attendance boundary, near Paulina and W Juneway Terrace
      s.location.geo = {
        latitude: 42.022533,
        longitude: -87.673263
      };
      // SULLIVAN HS
      p.schoolID = "609733";

      expect(ifInAttendBound(s, p)).to.equal(true);
    });

    it("should return true for an address inside a complex boundary, such as the peninsula in RICHARDS HS (SY1718) attendance bound", () => {
      // NOTE this test is likely to break, this peninsula seems like a mapping error. No houses in the peninsula as far as I can tell.
      
      // geolocation of point in peninsula on 49th st between Western and Hoyne
      s.location.geo = {
        latitude: 41.804515,
        longitude: -87.682384
      };
      // RICHARDS HS
      p.schoolID = "609682";

      expect(ifInAttendBound(s, p)).to.equal(true);
    });

  });

  describe("negative tests for attendance bounds", () => {
    it("should return false if a student is outside the attendance bound of a program with attendace bounds", () => {
      // geolocation of address near 50th St & Woodlawn
      s.location.geo = {
        latitude: 41.804759,
        longitude: -87.596650
      }

      // This is the School ID of PHILLIPS HS, which is a school with an attend bound that is far away
      p.schoolID = "609727";
      expect(ifInAttendBound(s,p)).to.equal(false);
    });
  });


  describe("error checking and unexpected inputs", () => {
    it("should return false if passed a student with an uninitialized location property", () => {
      // KENWOOD HS
      p.schoolNameShort = "Test";
      p.programType = "Test";
      p.schoolID = "609746";

      //s.location = undefined;
      //expect(ifInAttendBound(s,p)).to.equal(false);

      s.location = null;
      expect(ifInAttendBound(s,p)).to.equal(false);

      //s.location = {address: "", tier: "", geo: undefined};
      expect(ifInAttendBound(s,p)).to.equal(false);

      s.location = {address: "", tier: "", geo: {latitude: null, longitude: null}}
      expect(ifInAttendBound(s,p)).to.equal(false);
    });

    it("should throw if called with a program that does not have attendance bounds or does not have attendance bounds on record", () => {
      // geolocation of address near 50th St & Woodlawn
      s.location.geo = {
        latitude: 41.804759,
        longitude: -87.596650
      }
      // school id of PERSPECTIVES HS, which does not have attendance boundaries
      p.schoolID = "400066";

      expect(() => ifInAttendBound(s,p)).to.throw();
    });

  });
});



