const fs = require("fs");


// CONSIDER IN FUTURE add date to config files

// Constants
// ==================

// how many decimal places to round geocoordinates to
const ATTENDANCE_BOUND_COORDINATE_PRECISION = 3; 
// value of rawProgramData.Primary_Category that corresponds to high school or elementary school
const PROGRAM_CATEGORY_ES = "ES";
const PROGRAM_CATEGORY_HS = "HS";

// Input filepaths
// ------------------
const srcDir = path.resolve(__dirname, "..", "data");
const INPUT_FILEPATH_RAW_PROGRAM_DATA = path.join(srcDir, "program-data", "Chicago_Public_Schools_-_School_Admissions_Information_SY1617.csv");
//const INPUT_FILEPATH_RAW_ES_ATTENDANCE_BOUND_GEOMETRY = path.join(srcDir, "es-attendance-boundaries", "Chicago Public Schools - Elementary School Attendance Boundaries SY1718.geojson");
const INPUT_FILEPATH_RAW_HS_ATTENDANCE_BOUND_GEOMETRY = path.join(srcDir, "hs-attendance-boundaries", "Chicago Public Schools - High School Attendance Boundaries SY1718.geojson");
const INPUT_FILEPATH_PROGRAM_GROUPS = path.join(srcDir, "program-groups", "program-groups.config.json");
const INPUT_FILEPATH_TRACT_TIER_TABLE = path.join(srcDir, "tract-tier-table", "tract-tier-table.json");

// Output filepaths
// ------------------
const destDir = path.resolve(__dirname, "..", "..", "dist", "data");
const OUTPUT_FILEPATH_PROGRAM_DATA = path.join(destDir, hs-program-data.json);
const OUTPUT_FILEPATH_ATTENDANCE_BOUND_GEOMETRIES = path.join(destDir, "attendance-bound-geometries.json");
const OUTPUT_FILEPATH_PROGRAM_GROUPS = path.join(destDir, "program-groups.json");
const OUTPUT_FILEPATH_TRACT_TIER_TABLE = path.join(destDir, "tract-tier-table.json");

// ==================

function buildAll() {
  // Program Data
  // --
  const rawProgramDataCsv = fs.readFileSync(INPUT_FILEPATH_RAW_PROGRAM_DATA, "utf-8");
  const programData = buildProgramData(rawProgramDataCsv);
  fs.writeFileSync(OUTPUT_FILEPATH_PROGRAM_DATA, programData, "utf-8");
  
  // School attendance boundaries
  // --
  const rawHSAttendanceBoundGeojson = fs.readFileSync(INPUT_FILEPATH_RAW_HS_ATTENDANCE_BOUND_GEOMETRY, "utf-8");
  const schoolAttendanceBoundTable = buildSchoolAttendanceBoundTable(rawHSAttendanceBoundGeojson, ATTENDANCE_BOUND_COORDINATE_PRECISION);
  fs.writeFileSync(OUTPUT_FILEPATH_ATTENDANCE_BOUND_GEOMETRIES, schoolAttendanceBoundTable, "utf-8");

  // Program Groups
  // --
  fs.copyFileSync(INPUT_FILEPATH_PROGRAM_GROUPS, OUTPUT_FILEPATH_PROGRAM_GROUPS);

  // Tract-tier table
  // --
  fs.copyFileSync(INPUT_FILEPATH_TRACT_TIER_TABLE, OUTPUT_FILEPATH_TRACT_TIER_TABLE);
}

buildAll();
