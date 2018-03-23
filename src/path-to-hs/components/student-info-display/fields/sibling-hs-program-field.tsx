import * as React from "react";
import { connect } from "react-redux";
import { List, Map, fromJS } from "immutable";
import { createSelector } from "reselect";

import { updateStudentSiblingHSSchools } from "shared/actions";
import AppState from "shared/types/app-state";

import MultiSelectField from "shared/components/ui/fields/multi-select-field";
import DropdownField from "shared/components/ui/fields/dropdown-field";

import { INPUT_DEBOUNCE_TIME } from "shared/constants";

interface CPSSchool {
  School_ID: string
  Short_Name: string
}

interface SiblingHSFieldProps {
  hsSchools: CPSSchool[]
  siblingHSSchools: CPSSchool[]
  onChange: (newSiblingSchools: CPSSchool[]) => any
}

interface SiblingHSFieldState {
  hasSibling: boolean
}

class SiblingHSProgramInput extends React.PureComponent<SiblingHSFieldProps, SiblingHSFieldState> { 
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
            values={this.props.siblingHSSchools}
            data={
              {
                records: this.props.hsSchools, 
                getKey: (program) => program.School_ID, 
                getDisplayText: (program) => program.Short_Name
              }
            }
            onChange={ (programs: CPSSchool[]) => {
              console.log(programs);
              return this.props.onChange(programs) 
            } }
            debounceTime={INPUT_DEBOUNCE_TIME}
          /> 
        }
      </div>
    );
  }
}


const getHSSchools = (state: AppState): Map<string, string> => state.getIn(['hsData', 'hsSchools']);
const getSiblingHSSchoolIDs = (state: AppState): List<string> => state.getIn(['studentData', 'siblingHSSchoolIDs']);

const selectHSSchools = createSelector( 
  [getHSSchools], 
  (hsSchools: Map<string, string>): CPSSchool[] => {
    const hsSchoolList = hsSchools.map( (schoolName, schoolID) => {
      return {
        School_ID: schoolID,
        Short_Name: schoolName
      };
    });
    return hsSchoolList.toArray().sort( (a,b) => a.Short_Name.localeCompare(b.Short_Name) );
  }
);

const selectSiblingHSSchools = createSelector(
  [getSiblingHSSchoolIDs, getHSSchools],
  (siblingSchoolIDs: List<string>, hsSchools: Map<string, string>): CPSSchool[] => {
    const schoolIDs = siblingSchoolIDs.toJS();
    return schoolIDs.map( schoolID => {
      return {
        School_ID: schoolID,
        Short_Name: hsSchools.get(schoolID)
      };
    });
  }
);

const mapStateToProps = (state: AppState) => {
  return {
    siblingHSSchools: selectSiblingHSSchools(state),
    hsSchools: selectHSSchools(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: siblingSchools => {
      const schoolIDs = siblingSchools.map( school => school.School_ID );
      const immutableSchoolIDs = fromJS(schoolIDs);
      dispatch(updateStudentSiblingHSSchools(immutableSchoolIDs))
    }
  };
};

export const SiblingHSProgramField = connect(mapStateToProps, mapDispatchToProps)(SiblingHSProgramInput);
