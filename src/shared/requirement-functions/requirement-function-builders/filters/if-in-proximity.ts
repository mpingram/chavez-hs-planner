import { LatLong } from "shared/types";

import isUninitialized from "shared/util/is-uninitialized";
import distanceBetweenCoords from "shared/util/distance-between-coords";

import { ReqFnFilter} from "./";
import { CPS_PROXIMITY_LOTTERY_RADIUS_MI } from "../../constants";

export const ifInProximity: ReqFnFilter = (student, program) => {
  // return false immediately if student properties are uninitialized
  if (student.location === null) {
    return false;
  }

  const studentCoords = student.location.geo as LatLong;
  const schoolCoords = program.schoolLocation;
  const distance = distanceBetweenCoords(studentCoords, schoolCoords);
  return distance <= CPS_PROXIMITY_LOTTERY_RADIUS_MI;
};

