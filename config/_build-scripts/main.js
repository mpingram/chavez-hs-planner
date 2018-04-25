/*
 * Tasks:
 *  - create hs-programs.json from program-data
 *  - create es-programs.json from program-data
 *  - compile requirement-functions from provided
 *    files into requirement-functions.bundle.js
 *      -- CONSIDER validating req fns against program-data
 *  - create geometry-table.json from es and hs attendance
 *    bounds
 *      -- reduce geometry precision for easier storage
 *  - 
 **/

function main() {
  // read programData file into memory
  // esPrograms = buildESPrograms(programData)
  // hsPrograms = buildHSPrograms(programData)
  // write esPrograms and hsPrograms to dist/
  
  // read programGroups into memory
  // write programGroups to dist/
  

  // check and see if the entries in RequirementFunctions
  // match the schools and descriptions we see in programData
  // run buildReqFns(input path, output path) -- or use memoryfs
  

}

// build
function buildESPrograms(programData) {
  // filter out only ES programs.

  // hash the values of the Application_Requirements and Program_Selections properties;
  // Add Application_Requirements_Fn and Selection_Requirements_Fn properties with
  // those hashes.
  
  // return the resulting js obj
};

function buildHSPrograms(programData) {
  // filter out only HS programs.

  // hash the values of the Application_Requirements and Program_Selections properties;
  // Add Application_Requirements_Fn and Selection_Requirements_Fn properties with
  // those hashes.
  
  // return the resulting js obj
};

function buildProgramGroups(programGroups) {
  // no processing necessary?
  // move program groups to dist/ as program-groups.json
};

function buildRequirementFunctions(requirementFns) {
  // strip requirement-functions of unnecessary properties
  // call webpack to bundle requirement-functions file with local
  //   webpack config in this folder
  // CONSIDER writing to memory for sake of consistent api
  //
  // (if writing to memory) return resulting bundle
  // (if writing to file) return success/error statistics about file written
};

// util
function diffReqFnsAgainstProgramData() {};
function createEmptyReqFns() {};
