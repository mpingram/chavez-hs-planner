import StudentScores from "shared/types/student-scores";
import ScoreType from "shared/types/score-type";
import ScoreTransformerFunction from "shared/types/score-transformer-function";
import ScoreTransformerSettings from "shared/types/score-transformer-settings";

// takes in ScoreProjectorValues and outputs a ScoreProjectorFunction.
// ScoreProjectorFunction transforms StudentScores and returns new StudentScores.
const createScoreTransformerFunction = (transformerSettings: ScoreTransformerSettings): ScoreTransformerFunction => {
  return function(oldScores: StudentScores): StudentScores {
    let newScores: StudentScores = {};
    for (let scoreType in oldScores) {
      const oldScore = oldScores[scoreType];
      const transformerSetting = transformerSettings[scoreType];
      newScores[scoreType] = transformScore(oldScore, transformerSetting, scoreType as ScoreType); 
    }
    return newScores;

  };
};

const transformScore = (oldScore: number, setting: number, scoreType: ScoreType) => {
  // FIXME: mock
  return oldScore + setting;
}

export default createScoreTransformerFunction; 
