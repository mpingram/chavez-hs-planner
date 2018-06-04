import { connect } from "react-redux";

import { AppState } from "shared/types/app-state";
import { ScoreType } from "shared/enums/score-type";
import { updateStudentScore } from "shared/redux/actions";


const mapStateScore = (scoreType: ScoreType) => (state: AppState) => {
  return { 
    value: state.studentData[scoreType] 
  };
}
const mapDispatchScore = (scoreType: ScoreType) => (dispatch) => {
  return { 
    onChange: (value) => dispatch(updateStudentScore(scoreType, value)) 
  }
};

export const connectScoreType = (scoreType: ScoreType) => (elem) => {
  return connect(
    mapStateScore(scoreType),
    mapDispatchScore(scoreType)
  )(elem);
}

