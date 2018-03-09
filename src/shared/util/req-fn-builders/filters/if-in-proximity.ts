import HSReqFilter from "shared/types/hs-req-filter";

const PROXIMITY_RADIUS_MI = 0.5; // distance that student must live from school to be in proximity lottery

// TODO implement
const getDistanceBetween = (student, program): number => 0;

export const ifInProximityOfSchool: HSReqFilter = (student, program) => {
  return getDistanceBetween(student, program) <= PROXIMITY_RADIUS_MI;
};

