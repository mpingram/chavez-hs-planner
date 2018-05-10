import * as React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { 
  AppState,
  Program,
  ProgramGroup
} from "shared/types";
import { SuccessChance } from "shared/enums";

import { selectHSProgram } from "shared/redux/actions";

import HSProgramList from "./hs-program-list";

const getProgramGroupDict = (state: AppState) => state.hsData.hsProgramGroups;
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

const mapStateToProps = (state: AppState) => {
  return {
    programs: state.hsData.hsPrograms,
    outcomes: state.programOutcomes, 
    programGroups: selectProgramGroups,
    selectedProgramID: state.selectedHSProgramID
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectedProgramIDChange: (newID: string) => dispatch(selectHSProgram(newID))
  }
};

const HSProgramsContainer = connect(mapStateToProps, mapDispatchToProps)(HSProgramList);

export default HSProgramsContainer;


