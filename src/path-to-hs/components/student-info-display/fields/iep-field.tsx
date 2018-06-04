import * as React from "react";
import { connect } from "react-redux";

import { updateStudentIEPStatus } from "shared/redux/actions";
import { AppState } from "shared/types";

import DropdownField from "shared/components/ui/fields/dropdown-field";

import { INPUT_DEBOUNCE_TIME } from "shared/constants";

interface IEPFieldProps {
  iepStatus: boolean | null
  onChange: (newIEPStatus: boolean) => any
}
const IEPField: React.SFC<IEPFieldProps> = (props) => (
  <DropdownField
    label="Do you have an IEP?"
    value={props.iepStatus ? "true" : "false"}
    onChange={ iep => props.onChange(iep === "true" ? true : false) }
    debounceTime={INPUT_DEBOUNCE_TIME}
    >
    <option value="true">Yes</option>
    <option value="false">No</option>
    <option value="false">I don't know</option>
  </DropdownField>
);

const mapStateToProps = (state: AppState) => {
  return {
    iep: state.studentData.iep
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: iep => dispatch(updateStudentIEPStatus(iep))
  }
};

export const IEPFieldContainer = connect(mapStateToProps, mapDispatchToProps)(IEPField);
