const fs = require("fs");
const json2csv = require("json2csv");
const jsonschema = require("jsonschema");
const rawDataValidators = require("./raw-data-validators");

const rawProgramDataSchema = require("../schema/raw-data/raw-program-data");
const rawAttendanceBoundariesSchema = require("../schema/raw-data/raw-attendance-boundaries.js");
const tractTierTableConfigSchema = require("../schema/raw-data/tract-tier-table-config.js");
const programGroupsConfigSchema = require("../schema/raw-data/program-groups-config.js");
const cutoffScoresSchema = require("../schema/raw-data/cutoff-scores.json");

// CONSIDER IN FUTURE add date to config files

// Constants
// ==================

// how many decimal places to round geocoordinates to
const ATTENDANCE_BOUND_COORDINATE_PRECISION = 3; 
// value of rawProgramData.Primary_Category that corresponds to high school or elementary school
const PROGRAM_CATEGORY_ES = "ES";
const PROGRAM_CATEGORY_HS = "HS";

// Raw data filepaths
// ------------------
const srcDir = path.resolve(__dirname, "..", "data");
const INPUT_FILEPATH_RAW_PROGRAM_DATA = path.join(srcDir, "program-data", "Chicago_Public_Schools_-_School_Admissions_Information_SY1617.csv");
//const INPUT_FILEPATH_RAW_ES_ATTENDANCE_BOUND_GEOMETRY = path.join(srcDir, "es-attendance-boundaries", "Chicago Public Schools - Elementary School Attendance Boundaries SY1718.geojson");
const INPUT_FILEPATH_RAW_HS_ATTENDANCE_BOUND_GEOMETRY = path.join(srcDir, "hs-attendance-boundaries", "Chicago Public Schools - High School Attendance Boundaries SY1718.geojson");
const INPUT_FILEPATH_PROGRAM_GROUPS = path.join(srcDir, "program-groups", "program-groups.config.json");
const INPUT_FILEPATH_TRACT_TIER_TABLE = path.join(srcDir, "tract-tier-table", "tract-tier-table.json");
const INPUT_FILEPATH_CUTOFF_SCORES = path.join(srcDir, "cutoff-scores", "cutoff-scores.json");

// Processed data filepaths
// ------------------
const destDir = path.resolve(__dirname, "..", "..", "dist", "data");
const OUTPUT_FILEPATH_PROGRAM_DATA = path.join(destDir, hs-program-data.json);
const OUTPUT_FILEPATH_ATTENDANCE_BOUND_GEOMETRIES = path.join(destDir, "school-attendance-boundary-table.json");
const OUTPUT_FILEPATH_PROGRAM_GROUPS = path.join(destDir, "program-groups.json");
const OUTPUT_FILEPATH_TRACT_TIER_TABLE = path.join(destDir, "tract-tier-table.json");
const OUTPUT_FILEPATH_CUTOFF_SCORES = path.join(destDir, "cutoff-scores.json");

// ==================

function buildAll() {
  // Program Data
  // --
  const rawProgramDataCsv = fs.readFileSync(INPUT_FILEPATH_RAW_PROGRAM_DATA, "utf-8");
  const rawProgramDataJSON = json2csv.parse(rawProgramData);
  validateOrThrow(rawProgramDataJSON, rawProgramDataSchema);
  const validationResult = jsonschema.validate(rawProgramDataJSON, rawProgramDataSchema);
  const programData = buildProgramData(rawProgramData);
  fs.writeFileSync(OUTPUT_FILEPATH_PROGRAM_DATA, programData, "utf-8");
  
  // School attendance boundaries
  // --
  const rawHSAttendanceBoundGeojson = JSON.parse(fs.readFileSync(INPUT_FILEPATH_RAW_HS_ATTENDANCE_BOUND_GEOMETRY, "utf-8"));
  validateOrThrow(rawHSAttendanceBoundGeojson, rawAttendanceBoundariesSchema);
  const schoolAttendanceBoundTable = buildSchoolAttendanceBoundaryTable(rawHSAttendanceBoundGeojson, ATTENDANCE_BOUND_COORDINATE_PRECISION);
  fs.writeFileSync(OUTPUT_FILEPATH_ATTENDANCE_BOUND_GEOMETRIES, schoolAttendanceBoundTable, "utf-8");

  // Program Groups
  // --
  const programGroupsJSON = JSON.parse(fs.readFileSync(INPUT_FILEPATH_PROGRAM_GROUPS, "utf-8"));
  validateOrThrow(programGroupsJSON, programGroupsConfigSchema);
  fs.copyFileSync(INPUT_FILEPATH_PROGRAM_GROUPS, OUTPUT_FILEPATH_PROGRAM_GROUPS);

  // Tract-tier table
  // --
  const tractTierTableJSON = JSON.parse(fs.readFileSync(INPUT_FILEPATH_TRACT_TIER_TABLE, "utf-8"));
  validateOrThrow(tractTierTableJSON, tractTierTableConfigSchema);
  fs.copyFileSync(INPUT_FILEPATH_TRACT_TIER_TABLE, OUTPUT_FILEPATH_TRACT_TIER_TABLE);

  // Historical cutoff scores
  // --
  const cutoffScoresJSON = JSON.parse(fs.readFileSync(INPUT_FILEPATH_CUTOFF_SCORES, "utf-8"));
  validateOrThrow(cutoffScoresJSON, cutoffScoresSchema);
  fs.copyFileSync(INPUT_FILEPATH_TRACT_TIER_TABLE, OUTPUT_FILEPATH_TRACT_TIER_TABLE);

}

function validateOrThrow(json, schema) {
  const validationResult = jsonschema.valiate(json, schema);
  if (validationResult.errors.length !== 0) {
    throw new Error(validationResult);  
  } else {
    return;
  }
}

buildAll();
