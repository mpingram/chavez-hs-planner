const fs = require("fs");
const path = require("path");
const csvParseSync = require("csv-parse/lib/sync");
const jsonschema = require("jsonschema");

const createProgramData = require("./create-program-data");
const createProgramTypeIDTable = require("./create-program-type-id-table");
const createSchoolAttendanceBoundaryTable = require("./create-school-attendance-boundary-table");

const schemaDir = path.resolve(__dirname, "..", "schema");
const rawProgramDataSchema = require(path.resolve(schemaDir, "raw-program-data.json"));
const rawAttendanceBoundariesSchema = require(path.resolve(schemaDir, "raw-attendance-boundaries.json"));
const tractTierTableConfigSchema = require(path.resolve(schemaDir, "tract-tier-table.json"));
const seCutoffScoresSchema = require(path.resolve(schemaDir, "se-cutoff-scores.json"));
const nonSECutoffScoresSchema = require(path.resolve(schemaDir, "non-se-cutoff-scores.json"));
const programTypeIDsConfigSchema = require(path.resolve(schemaDir, "program-type-ids.config.json"));

const schoolAttendanceBoundTableSchema = require(path.resolve(schemaDir, "school-attendance-boundary-table.json"));
const programTypeIDTableSchema = require(path.resolve(schemaDir, "program-type-id-table.json"));
const hsProgramsSchema = require(path.resolve(schemaDir, "hs-programs.json"));
const nonHSProgramsSchema = require(path.resolve(schemaDir, "non-hs-programs.json"));

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
const INPUT_FILEPATH_SE_CUTOFF_SCORES = path.join(srcDir, "se-cutoff-scores", "se-cutoff-scores.json");
const INPUT_FILEPATH_NON_SE_CUTOFF_SCORES = path.join(srcDir, "non-se-cutoff-scores", "non-se-cutoff-scores.json");
const INPUT_FILEPATH_PROGRAM_TYPE_IDS = path.join(srcDir, "program-type-ids", "program-type-ids.config.json");

// Processed data filepaths
// ------------------
const destDir = path.resolve(__dirname, "..", "..", "dist", "data");
const OUTPUT_FILEPATH_ATTENDANCE_BOUND_GEOMETRIES = path.join(destDir, "school-attendance-boundary-table.json");
const OUTPUT_FILEPATH_TRACT_TIER_TABLE = path.join(destDir, "tract-tier-table.json");
const OUTPUT_FILEPATH_SE_CUTOFF_SCORES = path.join(destDir, "se-cutoff-scores.json");
const OUTPUT_FILEPATH_NON_SE_CUTOFF_SCORES = path.join(destDir, "non-se-cutoff-scores.json");
const OUTPUT_FILEPATH_PROGRAM_TYPE_ID_TABLE = path.join(destDir, "program-type-id-table.json");
const OUTPUT_FILEPATH_HS_PROGRAMS = path.join(destDir, "hs-programs.json");
const OUTPUT_FILEPATH_NON_HS_PROGRAMS = path.join(destDir, "non-hs-programs.json");

// ==================

function buildAll() {
  
  buildSchoolAttendanceBoundaryTable();
  buildTractTierTable();
  buildCutoffScores();
  buildProgramTypeIDTable();
  buildProgramData();

}

function buildSchoolAttendanceBoundaryTable() {
  const rawHSAttendanceBoundGeojson = JSON.parse(fs.readFileSync(INPUT_FILEPATH_RAW_HS_ATTENDANCE_BOUND_GEOMETRY, "utf-8"));
  validateOrThrow(rawHSAttendanceBoundGeojson, rawAttendanceBoundariesSchema);

  const schoolAttendanceBoundTable = createSchoolAttendanceBoundaryTable(rawHSAttendanceBoundGeojson, ATTENDANCE_BOUND_COORDINATE_PRECISION);
  validateOrThrow(schoolAttendanceBoundTable, schoolAttendanceBoundTableSchema);

  fs.writeFileSync(OUTPUT_FILEPATH_ATTENDANCE_BOUND_GEOMETRIES, JSON.stringify(schoolAttendanceBoundTable), "utf-8");
}

function buildTractTierTable() {
  const tractTierTable = JSON.parse(fs.readFileSync(INPUT_FILEPATH_TRACT_TIER_TABLE, "utf-8"));
  validateOrThrow(tractTierTable, tractTierTableConfigSchema);

  fs.copyFileSync(INPUT_FILEPATH_TRACT_TIER_TABLE, OUTPUT_FILEPATH_TRACT_TIER_TABLE);
}

function buildCutoffScores() {
  const seCutoffScoresConfig = JSON.parse(fs.readFileSync(INPUT_FILEPATH_SE_CUTOFF_SCORES, "utf-8"));
  const nonSECutoffScoresConfig = JSON.parse(fs.readFileSync(INPUT_FILEPATH_NON_SE_CUTOFF_SCORES, "utf-8"));
  validateOrThrow(seCutoffScoresConfig, seCutoffScoresSchema);
  validateOrThrow(nonSECutoffScoresConfig, nonSECutoffScoresSchema);

  // convert both se cutoff scores and non-se cutoff scores into a table relating program id to 
  // cutoff score. Throw if duplicate ids are encountered.
  
  let seCutoffScores = {};
  seCutoffScoresConfig.forEach( record => {
    // if this program id is already in the output, we have a duplicate id
    if (seCutoffScores[record.programID] !== undefined) {
      throw new Error(`Error: duplicate programID ${record.programID} in the selective enrollment cutoff scores config!`);
    }
    seCutoffScores[record.programID] = record.tieredCutoffScores;
  });
  
  let nonSECutoffScores = {};
  nonSECutoffScoresConfig.forEach( record => {
    // if this program id is already in the output, we have a duplicate id
    if (nonSECutoffScores[record.programID] !== undefined) {
      throw new Error(`Error: duplicate programID ${record.programID} in the non-selective-enrollment cutoff scores config!`);
    }
    nonSECutoffScores[record.programID] = record.cutoffScores;
  });

  fs.writeFileSync(OUTPUT_FILEPATH_SE_CUTOFF_SCORES, JSON.stringify(seCutoffScores), "utf-8");
  fs.writeFileSync(OUTPUT_FILEPATH_NON_SE_CUTOFF_SCORES, JSON.stringify(nonSECutoffScores), "utf-8");
}

function buildProgramTypeIDTable() {
  const programTypeIDsConfig = JSON.parse(fs.readFileSync(INPUT_FILEPATH_PROGRAM_TYPE_IDS, "utf-8"));
  validateOrThrow(programTypeIDsConfig, programTypeIDsConfigSchema);

  // test each program type id for uniqueness
  let keys = {};
  let duplicateKey;
  const hasUniqueKeys = programTypeIDsConfig.every( record => {
    const id = record.programTypeID;
    let isUnique;
    if (keys[id] === undefined) {
      isUnique = true;
    } else {
      duplicateKey = id;
      isUnique = false;
    }
    // add key to hashtable of keys we've already seen
    keys[id] = true;
    return isUnique;
  });
  if (!hasUniqueKeys) {
    throw new Error(`Two or more records in the program type id config share the same programTypeID property: ${duplicateKey}. All programTypeID properties in the program type id config must be unique.`);
  }

  const programTypeIDTable = createProgramTypeIDTable(programTypeIDsConfig);
  validateOrThrow(programTypeIDTable, programTypeIDTableSchema);

  fs.writeFileSync(OUTPUT_FILEPATH_PROGRAM_TYPE_ID_TABLE, JSON.stringify(programTypeIDTable), "utf-8");
}

function buildProgramData() {
  const programTypeIDsConfig = JSON.parse(fs.readFileSync(INPUT_FILEPATH_PROGRAM_TYPE_IDS, "utf-8"));
  validateOrThrow(programTypeIDsConfig, programTypeIDsConfigSchema);

  const rawProgramDataCsv = fs.readFileSync(INPUT_FILEPATH_RAW_PROGRAM_DATA, "utf-8");  
  // parse csv file into js object
  const rawProgramData = csvParseSync(rawProgramDataCsv, {columns: true});
  validateOrThrow(rawProgramData, rawProgramDataSchema);
  let programData;
  try {
    programData = createProgramData(rawProgramData, programTypeIDsConfig);
  } catch(e) {
    throw(e);
  }
  // separate out high school programs and other programs
  let hsPrograms = [];
  let nonHSPrograms = [];
  programData.forEach( program => {
    if (program.category === PROGRAM_CATEGORY_HS) {
      hsPrograms.push(program);
    } else {
      nonHSPrograms.push(program);
    }
  });

  validateOrThrow(hsPrograms, hsProgramsSchema);
  validateOrThrow(nonHSPrograms, nonHSProgramsSchema);
  
  fs.writeFileSync(OUTPUT_FILEPATH_HS_PROGRAMS, JSON.stringify(hsPrograms), "utf-8");
  fs.writeFileSync(OUTPUT_FILEPATH_NON_HS_PROGRAMS, JSON.stringify(nonHSPrograms), "utf-8");
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
