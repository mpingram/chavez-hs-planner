import { connect } from "react-redux";

import {
  updateStudentNWEAPercentileMath,
  updateStudentNWEAPercentileRead,
  updateStudentSubjGradeMath,
  updateStudentSubjGradeRead,
  updateStudentSubjGradeSci,
  updateStudentSubjGradeSocStudies,
  updateStudentAttendPercentage
} from "../../../shared/redux/actions";

import { GradesForm, GradesFormProps } from "./grades-form";

type StateProps = Pick<GradesFormProps,
  "nweaMath" |
  "nweaRead" |
  "mathGrade" |
  "readGrade" |
  "scienceGrade" |
  "socialStudiesGrade" |
  "attendancePercentage" |
  "gpa">
const mapStateToProps = (state): StateProps => {
  return {
    nweaMath: state.studentData.nweaPercentileMath,
    nweaRead: state.studentData.nweaPercentileRead,
    mathGrade: state.studentData.subjGradeMath,
    readGrade: state.studentData.subjGradeRead,
    scienceGrade: state.studentData.subjGradeSci,
    socialStudiesGrade: state.studentData.subjGradeSocStudies,
    attendancePercentage: state.studentData.attendancePercentage,
    gpa: state.studentData.gpa
  }
};

type DispatchProps = Pick<GradesFormProps,
  "onNWEAMathChange" |
  "onNWEAReadChange" |
  "onMathGradeChange" |
  "onReadGradeChange" |
  "onScienceGradeChange" |
  "onSocialStudiesGradeChange" |
  "onAttendancePercentageChange">
const mapDispatchToProps = (dispatch): DispatchProps => {
  return {
    onNWEAMathChange: val => dispatch(updateStudentNWEAPercentileMath(val)),
    onNWEAReadChange: val => dispatch(updateStudentNWEAPercentileRead(val)),
    onMathGradeChange: val => dispatch(updateStudentSubjGradeMath(val)),
    onReadGradeChange: val => dispatch(updateStudentSubjGradeRead(val)),
    onScienceGradeChange: val => dispatch(updateStudentSubjGradeSci(val)),
    onSocialStudiesGradeChange: val => dispatch(updateStudentSubjGradeSocStudies(val)),
    onAttendancePercentageChange: val => dispatch(updateStudentAttendPercentage(val))
  }
};

export const GradesFormContainer = connect(mapStateToProps, mapDispatchToProps)(GradesForm);
