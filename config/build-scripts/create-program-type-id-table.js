/**
 * buildProgramTypes takes programTypesConfig, a js object matching the
 * schema at ../schema/program-type-ids.config.json, and returns a js object
 * that maps program type IDs to program type names.
 * */
function createProgramTypeIDTable(programTypeIDsConfig) {
  let output = {}
  programTypeIDsConfig.forEach( record => {
    output[record.programTypeID] = record.name;
  });
  return output;
}

module.exports = createProgramTypeIDTable;
