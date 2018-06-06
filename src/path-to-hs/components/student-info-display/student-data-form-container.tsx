import { connect, mapStateToProps, mapDispatchToProps } from "react-redux";
import { createSelector } from "reselect";

import { AppState } from "shared/types";
import { INPUT_DEBOUNCE_TIME } from "shared/constants";

import StudentDataForm from "./student-data-form";

const selectESProgramOptions = () => {
  return {
    id: "",
    name: ""
  }
}

const selectHSSchoolOptions = () => {
  return {
    id: "",
    name: ""
  }
}

// alternate approach to consider:
// studentDataForm recieves one data prop of type
// StudentData.
// On change in form, StudentData is updated, and
// StudentDataForm ships off a new StudentData.
// In other words
// studentData
// onStudentDataChange
// 
// ... and handle validation / stuff internally, 
// including headache of dispatching web request
// for addr tier calculator?
const mapStateToProps = (state: AppState) => {
  return {
    addressIsLoading: false,
    currEsProgramOptions: selectESProgramOptions,
    siblingHSSchoolOptions: selectHSSchoolOptions,

    iep: state.studentData.iep,
    el: state.studentData.ell,
    skip7OrRepeat8: state.studentData.skippedGrade7OrRepeatedGrade8,
    currESProgram: state.studentData.currESProgramID,
    siblingHSSchools: state.studentData.siblingHSSchoolIDs,

    nweaMath: state.studentData.nweaPercentileMath,
    nweaRead: state.studentData.nweaPercentileRead,

    mathGrade: state.studentData.subjGradeMath,
    readingGrade: state.studentData.subjGradeRead,
    scienceGrade: state.studentData.subjGradeSci,
    socialStudiesGrade: state.studentData.subjGradeSocStudies
  }
}

const mapDispatchToProps = (dispatch) => {

}
