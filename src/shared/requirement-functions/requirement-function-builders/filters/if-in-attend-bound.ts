import { ReqFnFilter} from "./";

import pointInPolygon from "shared/util/point-in-polygon";

import { store } from "shared/redux/store";

const getSchoolAttendanceBoundaryTable = () => store.getState().data.schoolAttendanceBoundaryTable;

export const ifInAttendBound: ReqFnFilter = (student, program) => {
  // return false immediately if student properties are uninitialized
  if (student.location === null) {
    return false;
  }

  const point: [number, number] = [student.location.geo.longitude, student.location.geo.latitude];
  // get geometry from schoolAttendBoundTable by looking up thru ID
  const polygon = getSchoolAttendanceBoundaryTable()[program.schoolID];
  if (polygon === undefined) {
    console.warn(`No attend bound found for ${program.programName}`);
    return false
  }

  return pointInPolygon(point, polygon);
};
