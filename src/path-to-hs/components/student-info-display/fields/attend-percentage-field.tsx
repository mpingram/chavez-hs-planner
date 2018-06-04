import * as React from "react";
import { connect } from "react-redux";

import { updateStudentAttendPercentage } from "shared/redux/actions";
import { AppState } from "shared/types";

import NumberField from "shared/components/ui/fields/number-field";

import { INPUT_DEBOUNCE_TIME } from "shared/constants";
import between from "shared/util/limiters/between";

interface AttPctFieldProps {
  attendancePercentage: number | null
  onChange: (newAttendancePercentage: number) => any
}
const AttendPercentageField: React.SFC<AttPctFieldProps> = (props) => (
  <NumberField
    label="Your 7th grade attendance percentage"
    style={{width: "6em"}}
    value={props.attendancePercentage}
    onChange={props.onChange}
    limiter={between(0, 100)}
    debounceTime={INPUT_DEBOUNCE_TIME}
  />
);

const mapStateToProps = (state: AppState) => {
  return {
    attendancePercentage: state.studentData.attendancePercentage
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: attendPercentage => dispatch(updateStudentAttendPercentage(attendPercentage))
  }
};

export const AttendPercentageFieldContainer = connect(mapStateToProps, mapDispatchToProps)(AttendPercentageField);
