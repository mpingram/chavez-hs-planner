import HSReqFilter from "shared/types/hs-req-filter";
import isUninitialized from "shared/util/is-uninitialized";

import pointInPolygon from "shared/util/point-in-polygon";

declare const require: any;
const schoolAttendBoundTable = require("../../../data/school_geometry_table.json");

export const ifInAttendBound: HSReqFilter = (student, program) => {
  // return false immediately if student properties are uninitialized
  if (isUninitialized(student.location)) {
    return false;
  } else if (isUninitialized(student.location.geo)) {
    return false;
  } else if (isUninitialized(student.location.geo.latitude) || isUninitialized(student.location.geo.longitude)) {
    return false;
  }

  const point: [number, number] = [student.location.geo.latitude, student.location.geo.longitude];
  // get geometry from schoolAttendBoundTable by looking up thru ID
  const polygon = schoolAttendBoundTable[program.School_ID];
  if (polygon === undefined) {
    console.warn(`No attend bound found for ${program.Short_Name + ' - ' + program.Program_Type}`);
    return false;
  }

  return pointInPolygon(point, polygon);
};
