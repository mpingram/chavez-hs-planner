import * as React from "react";
import { connect } from "react-redux";

import { updateStudentELLStatus } from "shared/redux/actions";
import { AppState } from "shared/types";

import DropdownField from "shared/components/ui/fields/dropdown-field";

import { INPUT_DEBOUNCE_TIME } from "shared/constants";

interface ELLFieldProps {
  ellStatus: boolean | null
  onChange: (newEllStatus: boolean) => any
}
const ELLField: React.SFC<ELLFieldProps> = (props) => (
  <DropdownField
    label="Are you an English Language Learner?"
    value={props.ellStatus ? "true" : "false"}
    onChange={ ell => props.onChange(ell === "true" ? true : false) }
    debounceTime={INPUT_DEBOUNCE_TIME}
  >
    <option value="true">Yes</option>
    <option value="false">No</option>
    <option value="false">I don't know</option>
  </DropdownField>
);

const mapStateToProps = (state: AppState) => {
  return {
    ell: state.studentData.ell
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: ell => dispatch(updateStudentELLStatus(ell))
  }
};

export const ELLFieldContainer = connect(mapStateToProps, mapDispatchToProps)(ELLField);
