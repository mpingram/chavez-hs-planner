const fs = require("fs");

const normalizeProgramData = require("./normalize-program-data");
const buildRequirementFunctions = require("./build-requirement-functions");

const PROGRAM_CATEGORY_ES = "ES";
const PROGRAM_CATEGORY_HS = "HS";

// CONSIDER IN FUTURE add date to config files

const srcDir = path.resolve(__dirname, "..", "data");
const INPUT_FILEPATH_RAW_PROGRAM_DATA = path.join(srcDir, "program-data", "Chicago_Public_Schools_-_School_Admissions_Information_SY1617.csv");
const INPUT_FILEPATH_RAW_ES_ATTENDANCE_BOUND_GEOMETRY = path.join(srcDir, "es-attendance-boundaries", "Chicago Public Schools - Elementary School Attendance Boundaries SY1718.geojson");
const INPUT_FILEPATH_RAW_HS_ATTENDANCE_BOUND_GEOMETRY = path.join(srcDir, "hs-attendance-boundaries", "Chicago Public Schools - High School Attendance Boundaries SY1718.geojson");
const INPUT_FILEPATH_PROGRAM_GROUPS = path.join(srcDir,

const ENTRY_POINT_FILEPATH_REQUIREMENT_FUNCTIONS = path.resolve(__dirname, "..", "data", "requirement-functions", "index.ts");

const destDir = path.resolve(__dirname, "..", "..", "dist", "data");

const OUTPUT_FILEPATH_REQUIREMENT_FUNCTIONS =  path.join(destDir, "requirement-functions.min.js");
const OUTPUT_FILEPATH_PROGRAM_DATA = path.join(destDir, hs-program-data.json);
const OUTPUT_FILEPATH_ATTENDANCE_BOUND_TABLE = path.join(destDir, "attendance-bound-table.json");

function buildAll() {

  buildProgramData(INPUT_FILEPATH_RAW_PROGRAM_DATA, OUTPUT_FILEPATH_PROGRAM_DATA);
  buildGeometryTable(
    [INPUT_FILEPATH_RAW_ES_ATTENDANCE_BOUND_GEOMETRY, INPUT_FILEPATH_RAW_HS_ATTENDANCE_BOUND_GEOMETRY], 
    OUTPUT_FILEPATH_ATTENDANCE_BOUND_TABLE
  );
  buildProgramGroups(INPUT_FILEPATH_PROGRAM_GROUPS, OUTPUT_FILEPATH_PROGRAM_GROUPS);
  buildTractTierTable();

}


function buildProgramData(inputFilepath, outputFilepath) {
  // convert the raw program data to the shape the app expects
  const rawProgramDataFile = fs.readFileSync(inputFilepath, "utf8");
  const rawProgramData = JSON.parse(rawProgramDataFile);
  const programData = normalizeProgramData(rawProgramData);

  // and write to dist/
  fs.writeFileSync(outputFilepath, programData);
}


function buildGeometryTable(inputFilepathArr, outputFilepath) {
  // read each geo file
  // reduce geo precision
  // append geo files to same json table
};

function buildTractTierTable(inputFilepath, outputFilepath) {
  // move the thing
};

function buildProgramGroups(inputFilepath, outputFilepath) {
  // no processing necessary?
  // move program groups to dist/ as program-groups.json
};


function diffReqFnsAgainstProgramData() {
  // TODO
  // check and see if the entries in RequirementFunctions
  //   match the schools and descriptions we see in programData

}

