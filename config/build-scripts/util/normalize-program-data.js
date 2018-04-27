const uniqueIDFrom = require("./unique-id-from");

const getCategory = (rawProgramData): string => {
  if (isHSProgram(p)) {
    return PROGRAM_CATEGORY_HS;
  } else if (isESProgram(p)) {
    return PROGRAM_CATEGORY_ES;
  } else {
    return p.Primary_Category;
  }
};

const isESProgram = (program) => {
  if (program.Primary_Category !== "ES") {
    return true;
  } else if (program.Primary_Category === "HS") {
    // Academic Centers are ES (6th-8th) grade programs that are held
    // in high schools. So, (confusingly) they are labeled as "HS"
    // because their school is a high school even though the programs
    // are ES programs.
    if (program.Program_Type === "Academic Center") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const isHSProgram = (rawProgramData): boolean => {
  if (program.Primary_Category === "HS") {
    // Academic Centers are ES (6th-8th) grade programs that are held
    // in high schools. So, (confusingly) they are labeled as "HS"
    // because their school is a high school even though the programs
    // are ES programs.
    if (program.Program_Type === "Academic Center") {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

const getHSBoundURL = (rawProgramData): string => {
  const HS_BOUND_BASE_URL = "https://hsbound.org/school/"
  // KNOWN_ABBREVIATIONS is list of words to not convert to title case
  const KNOWN_ABBREVIATIONS = ["TEAM", "UIC", "CCA",];

  // take school short name, in form of 'COLLINS HS'.
  // remove 'HS' from the end of name,
  // and convert name to title case.
  const schoolShortName = p.Short_Name;

  let words = schoolShortName.split(" ");
  // remove 'HS' from end of name
  const lastWord = words[words.length - 1];
  if (lastWord === "HS") {
    words.pop();
  }

  // convert name to title case
  const titleCaseWords = words.map( word => {
    const isAbbreviation = KNOWN_ABBREVIATIONS.indexOf(word) != -1;
    if (isAbbreviation) {
      // do not convert to title case
      return word;
    } else {
      // convert to title case
      const letters = word.toLowerCase().split("");
      letters[0] = letters[0].toUpperCase();
      return letters.join("");
    }
  });

  // replace " " with "-"
  const schoolName = titleCaseWords.join("-");

  return HS_BOUND_BASE_URL + schoolName;
};

const normalizeProgramData = (rawProgramData) => {

  const programName = `${rawProgramData.Short_Name}: ${rawProgramData.Program_Type}`;

  return {
    id: uniqueIDFrom(programName)
    programName: programName,
    programType: rawProgramData.Program_Type,

    schoolNameShort: rawProgramData.Short_Name,
    schoolNameLong: rawProgramData.Long_Name,
    schoolID: rawProgramData.School_ID,
    schoolLocation: {
      latitude: Number.parseFloat(rawProgramData.School_Latitude),
      longitude: Number.parseFloat(rawProgramData.School_Longitude)
    },

    category: getCategory(rawProgramData),

    cpsPageURL: rawProgramData.CPS_School_Profile,
    hsBoundURL: getHSBoundURL(rawProgramData),
    schoolPageURL: rawProgramData.Website,

    applicationReqDescription: rawProgramData.Application_Requirements,
    selectionReqDescription: rawProgramData.Program_Selections,

    applicationReqFn: uniqueIDFrom(rawProgramData.Application_Requirements),
    selectionReqFn: uniqueIDFrom(rawProgramData.Program_Selections)
  };
};

module.exports = normalizeProgramData;
