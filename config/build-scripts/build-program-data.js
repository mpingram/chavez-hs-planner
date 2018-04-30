const fs = require("fs");
const json2csv = require("json2csv");

const normalizeProgramData = require("./util/normalize-program-data");

/**
 * Takes as input a .csv file listing all CPS Programs, both elementary school and high school.
 *
 * This .csv file should have the following columns:
 * School_ID	Short_Name	Long_Name	School_Type	Primary_Category	Address	City	State	Zip	Phone	Fax	CPS_School_Profile	Website	Program_Type	Application_Requirements	Program_Selections	Subprograms	How_To_Apply	Deadline	School_Latitude	School_Longitude	Location
 *
 * Outputs a javascript array of the shape:
 * [
 *  {
 *    id: string,
 *    programName: string,
 *    programType: string,
 *
 *    schoolNameShort: string,
 *    schoolNameLong: string,
 *    schoolID: string,
 *    schoolLocation: {
 *      latitude: number,
 *      longitude: number,
 *    },
 *
 *    category: string,
 *    cpsPageURL: string,
 *    schoolPageURL: string,
 *
 *    applicationReqDescription: string,
 *    selectionReqDescription: string,
 *    
 *    applicationReqFnID: string,
 *    selectionReqFnID: string
 *  },
 * ]
 * */
function buildProgramData(rawProgramDataCsv) {
  // convert .csv to JSON
  const rawProgramDataJSON = json2csv.parse(rawProgramData);
  // convert the raw program data to the shape the app expects
  const programData = normalizeProgramData(rawProgramDataJSON);
  
  return programData;
}

module.exports = normalizeProgramData;
