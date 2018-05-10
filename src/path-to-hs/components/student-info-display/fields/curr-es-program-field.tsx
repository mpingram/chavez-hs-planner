import * as React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { updateStudentCurrESProgram } from "shared/redux/actions";
import { 
  AppState,
  Program,
  ProgramDictionary
} from "shared/types";

import ComboBoxField  from "shared/components/ui/fields/combo-box-field";

import { INPUT_DEBOUNCE_TIME } from "shared/constants";

interface FieldProps {
  currProgramID: string | null
  programs: Program[]
  onChange: (newProgramID: string) => any
}
const Field = (props: FieldProps) => (
  <ComboBoxField
    label="What elementary school program are you in now?"
    value={props.currProgramID}
    data={
      { 
        records: props.programs, 
        getKey: (program) => program.id, 
        getDisplayText: (program: Program) => program.programName
      }
    }
    onChange={ (program: Program) => props.onChange(program.id)}
    debounceTime={INPUT_DEBOUNCE_TIME}
  /> 
);

const getNonHSPrograms = (state: AppState): ProgramDictionary => state.hsData.esPrograms;
const getStudentCurrESProgramID = (state: AppState): string | null => state.studentData.currESProgramID;

const selectNonHSPrograms = createSelector( 
  [getNonHSPrograms], 
  (programDict) => {
    // Convert the program dictionary we get from state
    // to Program[], sorted alphabetically.
    
    let programList: Program[] = [];
    Object.keys(programDict).forEach( programID => {
      const program = programDict[programID];
      programList.push(program);
    });

    programList.sort( (programA, programB) => {
      return programA.programName.localeCompare(programB.programName);
    });

    // HACK: add an 'Other' option to the top of the program list,
    // to serve as a 'my program isn't listed here' option.
    const otherProgram: Program = {
      id: "OTHER",
      programName: "Other (Non-CPS, Homeschool, etc.)"
    } as Program;
    programList.unshift(otherProgram);

    return programList;
  }
);

const selectCurrESProgram = createSelector(
  [getStudentCurrESProgramID, getNonHSPrograms],
  (id, programDict) => {
    if (id === null) {
      return null;
    }
    const program = programDict[id]
    return program;
  }
);

const mapStateToProps = (state: AppState) => {
  return {
    currProgram: selectCurrESProgram(state),
    programs: selectNonHSPrograms(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: programID => {
      dispatch(updateStudentCurrESProgram(programID))
    }
  }
};

export const CurrESProgramField = connect(mapStateToProps, mapDispatchToProps)(Field);
