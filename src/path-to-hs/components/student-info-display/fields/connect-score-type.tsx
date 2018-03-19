import { connect } from "react-redux";

import AppState from "shared/types/app-state";
import ScoreType from "shared/enums/score-type";
import { updateStudentScore } from "shared/actions";


const mapStateScore = (scoreType: ScoreType) => (state: AppState) => {
  switch(scoreType) {
    case ScoreType.nweaPercentileMath:
    case ScoreType.nweaPercentileRead:
      return {
        value: state.getIn(['studentData', scoreType]),
        gradeLevel: state.getIn(['studentData', 'gradeLevel'])
      }
    default:
      return { 
        value: state.getIn(['studentData', scoreType]) 
      };
  }
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

