import * as React from "react";
import { connect } from "react-redux";

import { updateStudentSkip7OrRepeated8 } from "shared/actions";
import AppState from "shared/types/app-state";
import DropdownField from "shared/components/ui/fields/dropdown-field";

import { INPUT_DEBOUNCE_TIME } from "shared/constants";

const Field = (props) => <DropdownField
  label="Did you skip 7th grade or repeat 8th grade?"
  value={ props.didSkip7OrRepeat8 }
  onChange={(value: string) => props.onChange( value === "true" ? true : false ) }
  debounceTime={props.debounceTime}
  >
  <option value="true">Yes</option>
  <option value="false">No</option>
</DropdownField>;

const mapStateToProps = (state: AppState) => {
  return {
    didSkip7OrRepeat8: state.getIn(['studentData', 'skippedGrade7OrRepeatedGrade8'])
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: didSkipGrade => dispatch(updateStudentSkip7OrRepeated8(didSkipGrade))
  }
};

export const SkippedGradeField = connect(mapStateToProps, mapDispatchToProps)(Field);
