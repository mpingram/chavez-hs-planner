import { 
  ReqFnFilter,
  AttendanceBoundaryDictionary
} from "shared/types";

import pointInPolygon from "shared/util/point-in-polygon";

export const createIfInAttendBound = (getAttendBoundDict: () => AttendanceBoundaryDictionary): ReqFnFilter => (student, program) => {
  // return false immediately if student properties are uninitialized
  if (student.location === null) {
    return false;
  }

  const point: [number, number] = [student.location.geo.longitude, student.location.geo.latitude];
  // get geometry from schoolAttendBoundTable by looking up thru ID
  const polygon = getAttendBoundDict()[program.schoolID];
  if (polygon === undefined) {
    console.warn(`No attend bound found for ${program.programName}`);
    return false;
  }

  return pointInPolygon(point, polygon);
};
