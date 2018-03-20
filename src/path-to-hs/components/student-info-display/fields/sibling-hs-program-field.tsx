import * as React from "react";
import { connect } from "react-redux";
import { List, Map } from "immutable";
import { createSelector } from "reselect";

import { updateStudentSiblingHSPrograms } from "shared/actions";
import AppState from "shared/types/app-state";
import CPSProgram from "shared/types/cps-program";

import MultiSelectField from "shared/components/ui/fields/multi-select-field";
import DropdownField from "shared/components/ui/fields/dropdown-field";

import { INPUT_DEBOUNCE_TIME } from "shared/constants";

interface SiblingHSFieldState {
  hasSibling: boolean
}

class SiblingHSProgramInput extends React.PureComponent<any, SiblingHSFieldState> { 
  constructor(props) {
    super(props);
    this.state = {
      hasSibling: false
    };
  }


  render() {
    return (
      <div>
        <DropdownField
          value={this.state.hasSibling ? "true" : "false"}
          label="Does your brother or sister go to a CPS High School?"
          onChange={ val => {
            if (val === "true") {
              this.setState({
                hasSibling: true
              });
            } else {
              this.setState({
                hasSibling: false
              });
              this.props.onChange([]);
            }
          } }
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </DropdownField>
      
        { this.state.hasSibling && 
          <MultiSelectField
            label="Which schools do your brother or sister go to?"
            values={this.props.siblingHSPrograms}
            data={
              {
                records: this.props.hsPrograms, 
                getKey: (program) => program.ID, 
                getDisplayText: (program) => {
                  return program.Short_Name + " - " + program.Program_Type;
                }
              }
            }
            onChange={ (programs: CPSProgram[]) => this.props.onChange(programs.map( program => program.ID ) )}
            debounceTime={INPUT_DEBOUNCE_TIME}
          /> 
        }
      </div>
    );
  }
}

const getPrograms = (state: AppState): List<CPSProgram> => state.getIn(['hsData', 'programs']);
const getProgramIndex = (state: AppState): Map<string, number> => state.getIn(['hsData', 'index']);
const getHSProgramIDs = (state: AppState): List<string> => state.getIn(['hsData', 'hsProgramIDs']);
const getSiblingHSProgramIDs = (state: AppState): List<string> => state.getIn(['studentData', 'siblingHSProgramIDs']);


const selectPrograms = (ids, allPrograms, index): CPSProgram[] => {
    let selectedPrograms = [];
    ids.forEach( id => {
      // use index to find cps program corresponding to id
      const i = index.get(id);
      const program = allPrograms.get(i);
      selectedPrograms.push(program);
    });
    return selectedPrograms;
};

const selectHSPrograms = createSelector( 
  [getHSProgramIDs, getPrograms, getProgramIndex], 
  selectPrograms
);

const selectSiblingHSPrograms = createSelector(
  [getSiblingHSProgramIDs, getPrograms, getProgramIndex],
  selectPrograms
);

const mapStateToProps = (state: AppState) => {
  return {
    siblingHSPrograms: selectSiblingHSPrograms(state),
    hsPrograms: selectHSPrograms(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: programIDs => {
      console.log(programIDs);
      dispatch(updateStudentSiblingHSPrograms(programIDs))
    }
  }
};


export const SiblingHSProgramField = connect(mapStateToProps, mapDispatchToProps)(SiblingHSProgramInput);
