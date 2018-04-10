// frontend
// --
export const INPUT_DEBOUNCE_TIME = 250; // ms

export const OutcomeCertainColor = "#5bed2a";
export const OutcomeLikelyColor = "#beee40";
export const OutcomeUncertainColor = "#f0e100";
export const OutcomeUnlikelyColor = "#f49600";
export const OutcomeNoneColor = "#f4743b";
export const OutcomeNotImplementedColor = "#999";

// requirement functions
// --
export const GEO_APPROX_DEG_KM_CONVERSION_FACTOR = 110.25;
export const GEO_APPROX_DEG_MI_CONVERSION_FACTOR = 68.5061739;
export const MILE_METER_CONVERSION_FACTOR = 1609.344; // there are this many meters in one mile
export const CPS_PROXIMITY_LOTTERY_RADIUS_MI = 2.5; // miles
export const CPS_PROXIMITY_LOTTERY_RADIUS_METERS = CPS_PROXIMITY_LOTTERY_RADIUS_MI * MILE_METER_CONVERSION_FACTOR;
export const POINT_SYSTEM_UNCERTAINTY_THRESHOLD = 2;

// program categories (high school or elementary school)
export const PROGRAM_CATEGORY_HS = "HS";
export const PROGRAM_CATEGORY_ES = "ES";

// cps programs
// --
export * from "./cps-es-program-ids";

