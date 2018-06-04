import * as React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { updateStudentCurrESProgram } from "shared/redux/actions";
import { 
  AppState,
  Program,
  ProgramDictionary
} from "shared/types";

import {withDebounce} from "shared/util/with-debounce";

import Select from "react-select";

import { INPUT_DEBOUNCE_TIME } from "shared/constants";

interface CurrESProgramFieldProps {
  currProgramID: string | null
  programs: Program[]
  onChange: (newProgramID: string | null) => any
}

const CurrESProgramField = (props: CurrESProgramFieldProps) => {

  const toSelectOptions = (programs: Program[]) => {
    return programs.map( program => {
      return {value: program.id, label: program.programName};
    });
  };

  const handleSelectedProgramIDChange = (programOption: {value: string, label: string} | null) => {
    if (programOption === null) {
      props.onChange(null);
    } else {
       props.onChange(programOption.value); 
    }
  }

  return (
    <div>
      <div className="selected-program-id-heading">
        What elementary school program are you in now?
      </div>
      <Select
        value={props.currProgramID}
        options={toSelectOptions(props.programs)}
        onChange={handleSelectedProgramIDChange}
      /> 
    </div>
  )
};

const getNonHSPrograms = (state: AppState): ProgramDictionary => state.data.nonHSPrograms;
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

const mapStateToProps = (state: AppState) => {
  return {
    currProgramID: state.studentData.currESProgramID,
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

const DebouncedCurrESProgramField = withDebounce( 
  CurrESProgramField,
  {
    valuePropName: 'currProgramID', 
    onChangePropName: 'onChange', 
    debounceTime: INPUT_DEBOUNCE_TIME
  }
);

export const CurrESProgramFieldContainer = connect(mapStateToProps, mapDispatchToProps)(DebouncedCurrESProgramField);
