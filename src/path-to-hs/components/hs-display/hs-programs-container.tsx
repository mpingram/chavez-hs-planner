import * as React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { 
  AppState,
  Program,
  ProgramGroup
} from "shared/types";


import { SuccessChance } from "shared/enums";

import HSProgramList from "./hs-program-list";

const getProgramGroupDict = (state: AppState) => state.data.hsProgramGroups;
const selectProgramGroups = createSelector(
  [getProgramGroupDict],
  (programGroupDict): ProgramGroup[] => {
    // convert dictionary of program groups to an
    // array of program groups alphabetically sorted by program
    // group display name.
    const programGroups: ProgramGroup[] = Object.keys(programGroupDict).map( groupID => programGroupDict[groupID] );
    return programGroups.sort( (groupA, groupB) => groupA.name.localeCompare(groupB.name) );
  }
);

const getProgramDict = (state: AppState) => state.data.hsPrograms;

const mapStateToProps = (state: AppState) => {
  console.log(state);
  return {
    programs: state.data.hsPrograms,
    outcomes: state.programOutcomes, 
    programGroups: selectProgramGroups(state),
  }
};

const HSProgramsContainer = connect(mapStateToProps)(HSProgramList);

export default HSProgramsContainer;


