import * as React from "react";
import { connect } from "react-redux";

import { updateStudentGradeLevel } from "shared/actions";

import DropdownField from "shared/components/ui/fields/dropdown-field";

import { INPUT_DEBOUNCE_TIME } from "shared/constants";

const Field = (props) => (
  <DropdownField
    label="What grade are you in?"
    value={props.value}
    onChange={str => props.onChange(parseInt(str))}
    debounceTime={INPUT_DEBOUNCE_TIME}
  >
    <option value="3">3rd grade</option>
    <option value="4">4th grade</option>
    <option value="5">5th grade</option>
    <option value="6">6th grade</option>
    <option value="7">7th grade</option>
    <option value="8">8th grade</option>
  </DropdownField>
);

const mapStateToProps = (state) => {
  return {
    gradeLevel: state.getIn(['studentData', 'gradeLevel'])
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: gradeLevel => dispatch(updateStudentGradeLevel(gradeLevel))
  }
};

export const GradeLevelField = connect(mapStateToProps, mapDispatchToProps)(Field);
