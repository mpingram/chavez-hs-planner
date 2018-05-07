const fs = require("fs");

const normalizeProgramData = require("./util/normalize-program-data");

/**
 * Takes as input a js object listing all CPS Programs, both elementary school and high school.
 *
 * For the schema of the input js object, see ./schema/raw-data/raw-program-data.json.
 *
 * For the schema of the output js object, see ./schema/processed-data/program-data.json.
 * */
function createProgramData(rawProgramData, programTypeIDConfig) {
  // convert the raw program data to the shape the app expects
  try {
    const programData = normalizeProgramData(rawProgramData, programTypeIDConfig);
    return programData;
  } catch(e) {
    throw(e);
  }
}

module.exports = createProgramData;
