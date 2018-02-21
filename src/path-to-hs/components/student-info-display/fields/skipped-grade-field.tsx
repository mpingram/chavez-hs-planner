import * as React from "react";
import { connect } from "react-redux";

import { updateStudentGradeLevel, updateStudentPrevGradeLevel } from "shared/actions";
import AppState from "shared/types/app-state";
import DropdownField from "shared/components/ui/fields/dropdown-field";

import { INPUT_DEBOUNCE_TIME } from "shared/constants";

const Field = (props) => <DropdownField
  label="Did you skip 7th grade or repeat 8th grade?"
  value={ props.gradeLevel && props.gradeLevel.toString()}
  onChange={(value: string) => props.onChange( value === "true" ? true : false ) }
  debounceTime={props.debounceTime}
  >
  <option value="true">Yes</option>
  <option value="false">No</option>
</DropdownField>;

const mapStateToProps = (state: AppState) => {
  return {
    gradeLevel: state.getIn(['studentData', 'gradeLevel'])
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: didSkipGrade => {
      // NOTE App state contains info about which grade the student is in,
      // and what the student's prev gradelevel was. This component gives the app
      // state answers that may not reflect the student's actual gradelevel history
      // (for example, student may have repeated 8th grade, but the onChange fn
      // here will always respond as though the student skipped 7th grade. It doesn't
      // actually make a difference for requirements -- it's a bad design decision that
      // this is how app state works.)
      // 
      // The state itself isn't being refactored yet in order to minimize changes
      // before a release (would require refactoring req fns), and also because 
      // I'm not sure if we're going to use the more detailed grade level version in the future.
      if (didSkipGrade) {
        dispatch(updateStudentGradeLevel(8))
        dispatch(updateStudentPrevGradeLevel(6))
      } else {
        dispatch(updateStudentGradeLevel(8))
        dispatch(updateStudentPrevGradeLevel(7))
      }
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Field);
