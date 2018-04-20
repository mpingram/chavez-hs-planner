import * as Redux from "redux";
import { Map } from "immutable";

import AppState from "shared/types/app-state";
import ActionType from "shared/enums/action-type";
import ProgramRequirementFunction from "shared/types/program-requirement-function";
import SuccessChance from "shared/enums/success-chance";
import Program from "shared/types/program";

import calculateGPA from "shared/util/calculate-gpa";
import getReqFns from "shared/util/get-req-fns";

import initialState from "./initial-state";


type ReqFnSelector = (program: Program) => {application: ProgramRequirementFunction, selection: ProgramRequirementFunction};
type Outcomes = Map<string, Map<string, SuccessChance>>;


// ensures that dependent properties of AppState
//  (ie studentData.gpa, hsData.outcomes) are set
//  correctly based on independent properties of AppState
//  (all others)
const updateDependentProperties = (state: AppState): AppState => {
  const mathGrade = state.getIn(['studentData', 'subjGradeMath']);
  const readGrade = state.getIn(['studentData', 'subjGradeRead']);
  const sciGrade = state.getIn(['studentData', 'subjGradeSci']);
  const socStudiesGrade = state.getIn(['studentData', 'subjGradeSocStudies']);
  const gpa = calculateGPA(mathGrade, readGrade, sciGrade, socStudiesGrade);
  return state.setIn(['studentData', 'gpa'], gpa);
};

const rootReducer = (state: AppState = initialState, action: Redux.AnyAction): AppState => {

  let nextState: AppState;

  switch(action.type) {
    case ActionType.UpdateStudentGender:
      nextState = state.setIn(['studentData', 'gender'], action.payload);
      break;

    case ActionType.UpdateStudentLocation:
      nextState = state.setIn(['studentData', 'location'], action.payload);
      break;

    case ActionType.UpdateStudentGradeLevel:
      nextState = state.setIn(['studentData', 'gradeLevel'], action.payload);
      break;

    case ActionType.UpdateStudentPrevGradeLevel:
      nextState = state.setIn(['studentData', 'prevGradeLevel'], action.payload);
      break;

    case ActionType.UpdateStudentIEPStatus:
      nextState = state.setIn(['studentData', 'iep'], action.payload);
      break;

    case ActionType.UpdateStudentELLStatus:
      nextState = state.setIn(['studentData', 'ell'], action.payload);
      break;

    case ActionType.UpdateStudentAttendPercentage:
      nextState = state.setIn(['studentData', 'attendancePercentage'], action.payload);
      break;

    // GPA is dependent property

    case ActionType.UpdateStudentCurrESProgram:
      nextState = state.setIn(['studentData', 'currESProgramID'], action.payload);
      break;

    case ActionType.UpdateStudentSkip7OrRepeated8:
      nextState = state.setIn(['studentData', 'skippedGrade7OrRepeatedGrade8'], action.payload);
      break;

    case ActionType.UpdateStudentSiblingHSSchools:
      nextState = state.setIn(['studentData', 'siblingHSSchoolIDs'], action.payload);
      break;

    case ActionType.UpdateStudentSETestPercentile:
      nextState = state.setIn(['studentData', 'seTestPercentile'], action.payload);
      break;

    case ActionType.UpdateStudentNWEAPercentileMath:
      nextState = state.setIn(['studentData', 'nweaPercentileMath'], action.payload);
      break;

    case ActionType.UpdateStudentNWEAPercentileRead:
      nextState = state.setIn(['studentData', 'nweaPercentileRead'], action.payload);
      break;

    case ActionType.UpdateStudentSubjGradeMath:
      nextState = state.setIn(['studentData', 'subjGradeMath'], action.payload);
      break;

    case ActionType.UpdateStudentSubjGradeRead:
      nextState = state.setIn(['studentData', 'subjGradeRead'], action.payload);
      break;

    case ActionType.UpdateStudentSubjGradeSci:
      nextState = state.setIn(['studentData', 'subjGradeSci'], action.payload);
      break;

    case ActionType.UpdateStudentSubjGradeSocStudies:
      nextState = state.setIn(['studentData', 'subjGradeSocStudies'], action.payload);
      break;

    case ActionType.SelectHSProgram:
      nextState = state.set('selectedHSProgramID', action.payload);
      break;

    default:
      console.warn(`No reducer for actiontype ${action.type}`);
      nextState = state;

  }

  const updatedState = updateDependentProperties(nextState);
  //console.log(updatedState.toJS());
  return updatedState;
  
};

export default rootReducer;


