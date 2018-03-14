import * as React from "react";
import { connect } from "react-redux";

import AppState from "shared/types/app-state";

import TextField from "shared/components/ui/fields/text-field";

import { INPUT_DEBOUNCE_TIME } from "shared/constants";

const Field = (props) => {
  const gpa = props.gpa ? props.gpa.toFixed(2) : "";
  return (
    <TextField
      label="Your GPA"
      editable={false}
      value={gpa}
      onChange={ () => false }
      debounceTime={INPUT_DEBOUNCE_TIME}
      >
    </TextField>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    gpa: state.getIn(['studentData', 'gpa'])
  }
};

export const GPADisplay = connect(mapStateToProps)(Field);
