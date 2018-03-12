import HSReqFilter from "shared/types/hs-req-filter";

import isUninitialized from "shared/util/is-uninitialized";
import distanceBetweenCoords from "shared/util/distance-between-coords";

import {CPS_PROXIMITY_LOTTERY_RADIUS_MI} from "shared/constants";

export const ifInProximity: HSReqFilter = (student, program) => {
  // return false immediately if student properties are uninitialized
  if (isUninitialized(student.location)) {
    return false;
  } else if (isUninitialized(student.location.geo)) {
    return false;
  } else if (isUninitialized(student.location.geo.latitude) || isUninitialized(student.location.geo.longitude)) {
    return false;
  }

  const studentCoords = student.location.geo;
  const schoolCoords = {
    latitude: parseFloat(program.School_Latitude),
    longitude: parseFloat(program.School_Longitude)
  };
  if (isNaN(schoolCoords.latitude) || isNaN(schoolCoords.longitude)) {
    throw new Error (`error parsing coordinates for school ${program.Short_Name}: (${program.School_Latitude}, ${program.School_Longitude})`);
  }
  const distance = distanceBetweenCoords(studentCoords, schoolCoords);
  return distance <= CPS_PROXIMITY_LOTTERY_RADIUS_MI;
};

