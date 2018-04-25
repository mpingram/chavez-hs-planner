import HSReqFilter from "shared/types/hs-req-filter";
import isUninitialized from "shared/util/is-uninitialized";

import pointInPolygon from "shared/util/point-in-polygon";

declare const require: any;
const schoolAttendBoundTable = require("../../../data/school-geometry-table.json");

export const ifInAttendBound: HSReqFilter = (student, program) => {
  // return false immediately if student properties are uninitialized
  if (isUninitialized(student.location)) {
    return false;
  } else if (isUninitialized(student.location.geo)) {
    return false;
  } else if (isUninitialized(student.location.geo.latitude) || isUninitialized(student.location.geo.longitude)) {
    return false;
  }

  const point: [number, number] = [student.location.geo.longitude, student.location.geo.latitude];
  // get geometry from schoolAttendBoundTable by looking up thru ID
  const polygon = schoolAttendBoundTable[program.schoolID];
  if (polygon === undefined) {
    console.warn(`No attend bound found for ${program.programName}`);
    return false
  }

  return pointInPolygon(point, polygon);
};
