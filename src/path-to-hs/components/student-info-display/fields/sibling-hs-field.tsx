import * as React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { updateStudentSiblingHSSchools } from "shared/redux/actions";
import { 
  AppState,
  School,
  SchoolDictionary
} from "shared/types";

import Select from "react-select";
/* TODO move to index if using */
//import 'react-select/dist/react-select.css'
//import 'react-virtualized/styles.css'
//import 'react-virtualized-select/styles.css'

import { INPUT_DEBOUNCE_TIME } from "shared/constants";

import DropdownField from "shared/components/ui/fields/dropdown-field";

interface SiblingHSFieldProps {
  schools: School[]
  siblingSchoolIDs: string[]
  onChange: (newSiblingSchoolIDs: string[]) => any
}
interface SiblingHSFieldState {
  hasSibling: boolean
}
class SiblingHSField extends React.PureComponent<SiblingHSFieldProps, SiblingHSFieldState> { 

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      hasSibling: false,
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
          <Select multi={true} options={this.toSelectOptions(this.props.schools)}/>
        }
      </div>
    );
  }

  private toSelectOptions = (schools: School[]) => {
    return schools.map( school => {
      return {
        value: school.id,
        label: school.shortName
      }
    });
  }
}


const getHSSchoolDict = (state: AppState): SchoolDictionary => state.data.hsSchools;

const selectHSSchools = createSelector( 
  [getHSSchoolDict], 
  (hsSchoolDict): School[] => {
    const hsSchoolList: School[] = Object.keys(hsSchoolDict).map( schoolID => hsSchoolDict[schoolID] );
    return hsSchoolList.sort( (a,b) => a.longName.localeCompare(b.longName) );
  }
);

const mapStateToProps = (state: AppState) => {
  return {
    siblingSchoolIDs: state.studentData.siblingHSSchoolIDs,
    schools: selectHSSchools(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: siblingHSSchoolIDs => {
      dispatch(updateStudentSiblingHSSchools(siblingHSSchoolIDs))
    }
  };
};

export const SiblingHSFieldContainer = connect(mapStateToProps, mapDispatchToProps)(SiblingHSField);
