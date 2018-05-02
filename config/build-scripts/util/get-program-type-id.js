/**
 * getProgramTypeID takes two parameters: a program type name (a string) and the
 * program types config (a javascript object matching the schema at ../schema/program-types-config.json).
 *
 * getProgramTypes searches the program types config and returns the program type ID that 
 * matches the name of the program type.  If no matching ID is found, the function returns null.
 *
 * The purpose of getProgramTypeID is to normalize the many different string
 * representations of a program type's name into a single stable ID. For example, the 
 * program types config may specify that 'Science and Engineering' and 'Science & Engineering' are
 * the same program type, and that the id of that program type is 47.
 * */
function getProgramTypeID(programType, programTypesConfig) {
  // iterate over programTypes config, looking for an entry that matches the programType passed in.
  for (let i = 0; i < programTypesConfig.length; i++) {
    const record = programTypesConfig[i];
    const recordMatchesProgramType = programTypeRecord.name === programType || programTypeRecord.alternateNames.some( name => name === programType );
    if(recordMatchesProgramType) {
      return record.id;
    }
  }

  // if no match has been found for the program type, return null.
  return null;
}

module.exports = getProgramTypeID;
