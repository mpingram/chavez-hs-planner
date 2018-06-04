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
function getProgramTypeID(programType, programTypeIDsConfig) {
  // iterate over programTypes config, looking for an entry that matches the programType passed in.
  for (let i = 0; i < programTypeIDsConfig.length; i++) {
    const record = programTypeIDsConfig[i];

    let programTypeMatchesName;
    let programTypeMatchesAltName;

    if (typeof programType === "string") {
      programTypeMatchesName = programType.trim().toLowerCase() === record.name.trim().toLowerCase()
    } else {
      return null;
    }

    if (record.alternateNames) {
      programTypeMatchesAltName = record.alternateNames.some( name => programType.trim().toLowerCase() === name.trim().toLowerCase() )
    } else {
      programTypeMatchesAltName = false;
    }

    if(programTypeMatchesName || programTypeMatchesAltName) {
      return record.programTypeID;
    }
  }

  // if no match has been found for the program type, return null.
  return null;
}

module.exports = getProgramTypeID;
