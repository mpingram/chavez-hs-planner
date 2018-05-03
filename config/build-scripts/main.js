const fs = require("fs");
const path = require("path");
const csvParseSync = require("csv-parse/lib/sync");
const jsonschema = require("jsonschema");

const buildProgramData = require("./build-program-data");
const buildProgramTypeIDTable = require("./build-program-type-id-table");
const buildSchoolAttendanceBoundaryTable = require("./build-school-attendance-boundary-table");

const rawProgramDataSchema = require("../schema/raw-program-data.json");
const rawAttendanceBoundariesSchema = require("../schema/raw-attendance-boundaries.json");
const tractTierTableConfigSchema = require("../schema/tract-tier-table.json");
const cutoffScoresSchema = require("../schema/cutoff-scores.json");
const programTypeIDsConfigSchema = require("../schema/program-type-ids.config.json");

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
const INPUT_FILEPATH_RAW_PROGRAM_DATA = path.join(srcDir, "raw-program-data", "Chicago_Public_Schools_-_School_Admissions_Information_SY1617.csv");
//const INPUT_FILEPATH_RAW_ES_ATTENDANCE_BOUND_GEOMETRY = path.join(srcDir, "es-attendance-boundaries", "Chicago Public Schools - Elementary School Attendance Boundaries SY1718.geojson");
const INPUT_FILEPATH_RAW_HS_ATTENDANCE_BOUND_GEOMETRY = path.join(srcDir, "hs-attendance-boundaries", "Chicago Public Schools - High School Attendance Boundaries SY1718.geojson");
const INPUT_FILEPATH_TRACT_TIER_TABLE = path.join(srcDir, "tract-tier-table", "tract-tier-table.json");
const INPUT_FILEPATH_CUTOFF_SCORES = path.join(srcDir, "cutoff-scores", "cutoff-scores.json");
const INPUT_FILEPATH_PROGRAM_TYPE_IDS = path.join(srcDir, "program-type-ids", "program-type-ids.config.json");

// Processed data filepaths
// ------------------
const destDir = path.resolve(__dirname, "..", "..", "dist", "data");
const OUTPUT_FILEPATH_PROGRAM_DATA = path.join(destDir, "hs-program-data.json");
const OUTPUT_FILEPATH_ATTENDANCE_BOUND_GEOMETRIES = path.join(destDir, "school-attendance-boundary-table.json");
const OUTPUT_FILEPATH_TRACT_TIER_TABLE = path.join(destDir, "tract-tier-table.json");
const OUTPUT_FILEPATH_CUTOFF_SCORES = path.join(destDir, "cutoff-scores.json");
const OUTPUT_FILEPATH_PROGRAM_TYPE_ID_TABLE = path.join(destDir, "program-type-id-table.json");

// ==================

function buildAll() {
  
  // School attendance boundaries
  // --
  const rawHSAttendanceBoundGeojson = JSON.parse(fs.readFileSync(INPUT_FILEPATH_RAW_HS_ATTENDANCE_BOUND_GEOMETRY, "utf-8"));
  validateOrThrow(rawHSAttendanceBoundGeojson, rawAttendanceBoundariesSchema);
  const schoolAttendanceBoundTable = buildSchoolAttendanceBoundaryTable(rawHSAttendanceBoundGeojson, ATTENDANCE_BOUND_COORDINATE_PRECISION);
  const schoolAttendanceBoundTableJSON = JSON.stringify(schoolAttendanceBoundTable);
  fs.writeFileSync(OUTPUT_FILEPATH_ATTENDANCE_BOUND_GEOMETRIES, schoolAttendanceBoundTableJSON, "utf-8");

  // Tract-tier table
  // --
  const tractTierTable = JSON.parse(fs.readFileSync(INPUT_FILEPATH_TRACT_TIER_TABLE, "utf-8"));
  validateOrThrow(tractTierTable, tractTierTableConfigSchema);
  fs.copyFileSync(INPUT_FILEPATH_TRACT_TIER_TABLE, OUTPUT_FILEPATH_TRACT_TIER_TABLE);

  // Historical cutoff scores
  // --
  const cutoffScores = JSON.parse(fs.readFileSync(INPUT_FILEPATH_CUTOFF_SCORES, "utf-8"));
  validateOrThrow(cutoffScores, cutoffScoresSchema);
  fs.copyFileSync(INPUT_FILEPATH_TRACT_TIER_TABLE, OUTPUT_FILEPATH_TRACT_TIER_TABLE);

  // Program Types
  // --
  const programTypeIDsConfig = JSON.parse(fs.readFileSync(INPUT_FILEPATH_PROGRAM_TYPE_IDS, "utf-8"));
  validateOrThrow(programTypeIDsConfig, programTypeIDsConfigSchema);
  const programTypeIDTable = buildProgramTypeIDTable(programTypeIDsConfig);
  fs.writeFileSync(OUTPUT_FILEPATH_PROGRAM_TYPE_ID_TABLE, JSON.stringify(programTypeIDTable), "utf-8");

  // Program Data
  // DEPENDENCY ON: programTypeIDsConfig
  // --
  const rawProgramDataCsv = fs.readFileSync(INPUT_FILEPATH_RAW_PROGRAM_DATA, "utf-8");  
  // parse csv file into js object
  const rawProgramData = csvParseSync(rawProgramDataCsv, {columns: true});
  validateOrThrow(rawProgramData, rawProgramDataSchema);
  let programData;
  try {
    programData = buildProgramData(rawProgramData, programTypeIDsConfig);
  } catch(e) {
    throw(e);
  }
  fs.writeFileSync(OUTPUT_FILEPATH_PROGRAM_DATA, programData, "utf-8");

}

function validateOrThrow(json, schema) {
  const validationResult = jsonschema.validate(json, schema);
  if (validationResult.errors.length !== 0) {
    throw new Error(validationResult);  
  } else {
    return;
  }
}

buildAll();
