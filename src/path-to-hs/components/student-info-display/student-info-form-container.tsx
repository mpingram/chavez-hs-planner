import { connect, mapStateToProps, mapDispatchToProps } from "react-redux";
import { createSelector } from "reselect";
import {
  updateStudentIEPStatus,
  updateStudentELLStatus,
  updateStudentAddress,
  updateStudentCurrESProgram,
  updateStudentSiblingHSSchools,
  updateStudentSkip7OrRepeated8,
} from "shared/redux/actions";

import { AppState } from "shared/types";
import { INPUT_DEBOUNCE_TIME } from "shared/constants";

import StudentInfoForm from "./student-info-form";

const selectESProgramOptions = () => {
  return {
    id: "",
    name: ""
  }
};

const selectHSSchoolOptions = () => {
  return {
    id: "",
    name: ""
  }
};

const mapStateToProps = (state: AppState) => {
  return {
    addressIsLoading: state.loadingStatus.loadingTier,
    currEsProgramOptions: selectESProgramOptions,
    siblingHSSchoolOptions: selectHSSchoolOptions,

    iep: state.studentData.iep,
    el: state.studentData.ell,
    address: state.studentData.address,
    tier: state.studentData.tier,
    skip7OrRepeat8: state.studentData.skippedGrade7OrRepeatedGrade8,
    currESProgram: state.studentData.currESProgramID,
    siblingHSSchools: state.studentData.siblingHSSchoolIDs,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIEPChange: newVal => dispatch(updateStudentIEPStatus(newVal)),
    onELChange: newVal => dispatch(updateStudentELLStatus(newVal)),
    onAddressChange: newVal => dispatch(updateStudentAddress(newVal)),
    onSkip7OrRepeat8Change: newVal => dispatch(updateStudentSkip7OrRepeated8(newVal)),
    onCurrESProgramChange: newVal => dispatch(updateStudentCurrESProgram(newVal)),
    onSiblingHSSchoolChange: newVal => dispatch(updateStudentSiblingHSSchools(newVal))
  }
};

export const StudentInfoFormContainer = connect(mapStateToProps, mapDispatchToProps)(StudentInfoForm);
