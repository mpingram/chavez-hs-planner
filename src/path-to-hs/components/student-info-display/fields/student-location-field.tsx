import * as React from "react";
import { connect } from "react-redux";

import { updateStudentLocation } from "shared/redux/actions";
import { 
  AppState,
  StudentLocation
} from "shared/types";
import { AddressTierCalculator } from "./address-tier-calculator";

interface StudentLocationFieldProps {
  location: StudentLocation
  onChange: (newLocation: StudentLocation) => any
}
const StudentLocationField: React.SFC<StudentLocationFieldProps> = (props) => (
  <AddressTierCalculator
    location={props.location}
    onLocationChange={props.onChange}
  />
);

const mapStateToProps = (state: AppState) => {
  return {
    location: state.studentData.location
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: location => dispatch(updateStudentLocation(location))
  }
};

export const StudentLocationFieldContainer = connect(mapStateToProps, mapDispatchToProps)(StudentLocationField);
