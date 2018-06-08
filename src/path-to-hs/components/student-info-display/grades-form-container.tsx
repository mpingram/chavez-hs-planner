import { connect, mapStateToProps, mapDispatchToProps } from "react-redux";
import { createSelector } from "reselect";
import {
  updateStudentNWEAPercentileMath,
  updateStudentNWEAPercentileRead,
  updateStudentSubjGradeMath,
  updateStudentSubjGradeRead,
  updateStudentSubjGradeSci,
  updateStudentSubjGradeSocStudies,
  updateStudentAttendPercentage
} from "shared/redux/actions";

import { AppState } from "shared/types";

import { GradesForm, GradesFormProps } from "./grades-form";

const mapStateToProps = (state: AppState): Partial<GradesFormProps> => {
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

const mapDispatchToProps = (dispatch): Partial<GradesFormProps> => {
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
