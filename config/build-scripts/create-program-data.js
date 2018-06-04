const fs = require("fs");

const normalizeProgramData = require("./util/normalize-program-data");

/**
 * Takes as input: 
 *  rawProgramData: array listing all CPS Programs, both elementary school and high school.
 *  programTypeIDConfig: array of objects specifying the different program types and their associated program type ids.
 *
 * For the schema of the input rawProgramData array, see ./schema/raw-program-data.json.
 * For the schema of the input programTypeIDConfig array, see ./schema/program-type-id-config.json.
 *
 * For the schema of the output js array, see ./schema/processed-data/program-data.json.
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
