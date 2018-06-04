import * as React from "react";
import { connect } from "react-redux";

import { updateStudentSkip7OrRepeated8 } from "shared/redux/actions";
import { AppState } from "shared/types";
import DropdownField from "shared/components/ui/fields/dropdown-field";

import { INPUT_DEBOUNCE_TIME } from "shared/constants";

interface SkippedGradeFieldProps {
  didSkipGrade: boolean | null
  onChange: (newDidSkipGrade: boolean) => any
}
const SkippedGradeField: React.SFC<SkippedGradeFieldProps> = (props) => {
  return (
    <DropdownField
      label="Did you skip 7th grade or repeat 8th grade?"
      value={ props.didSkipGrade ? "true" : "false" }
      onChange={(value: string) => props.onChange( value === "true" ? true : false ) }
      debounceTime={INPUT_DEBOUNCE_TIME}
    >
      <option value="true">Yes</option>
      <option value="false">No</option>
    </DropdownField>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    didSkip7OrRepeat8: state.studentData.skippedGrade7OrRepeatedGrade8
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: didSkipGrade => dispatch(updateStudentSkip7OrRepeated8(didSkipGrade))
  }
};

export const SkippedGradeFieldContainer = connect(mapStateToProps, mapDispatchToProps)(SkippedGradeField);
