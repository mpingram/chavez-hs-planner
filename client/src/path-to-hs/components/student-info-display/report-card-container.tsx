import * as React from "react";

import StudentData from "shared/types/student-data";
import StudentScores from "shared/types/student-scores";
import EffortLevel from "shared/enums/effort-level";

import clone from "shared/util/clone";

import EffortLevelSelector from "./effort-level-selector";
import ReportCard from "./report-card";

import {getAveragePercentileDifference, projectScores} from "shared/util/score-projection-utils";

interface ReportCardContainerProps {
  studentData: StudentData,
  projectedStudentData: StudentData,
  onProjectedStudentDataChange: (newData: StudentData) => any
}

interface ReportCardContainerState {
  effortLevel: EffortLevel
}

class ReportCardContainer extends React.Component<ReportCardContainerProps, ReportCardContainerState> {

  private toEffortLevel = (percentileChange: number): EffortLevel => {
    if (percentileChange < -40) {
      return EffortLevel.NONE;
    } else if (percentileChange < -20) {
      return EffortLevel.LOW;
    } else if (percentileChange < 20) {
      return EffortLevel.NORMAL;
    } else if (percentileChange < 40) {
      return EffortLevel.HIGH;
    } else {
      return EffortLevel.EXTREME;
    }
  }

  private toPercentileChange = (effortLevel: EffortLevel): number => {
    switch(effortLevel) {
      case EffortLevel.NONE:
        return -30;
      case EffortLevel.LOW:
        return -15;
      case EffortLevel.NORMAL:
        return 0;
      case EffortLevel.HIGH:
        return 15
      case EffortLevel.EXTREME:
        return 30
    }
  }

  private handleEffortLevelChange(newEffortLevel: EffortLevel): void {
    const percentileChange = this.toPercentileChange(newEffortLevel);
    let newProjectedData = clone(this.props.projectedStudentData);
    const targetGradeLevel = 7;
    newProjectedData.scores = projectScores(this.props.studentData.scores, percentileChange, this.props.studentData.gradeLevel, targetGradeLevel);
    this.props.onProjectedStudentDataChange(newProjectedData);
  }

  private handleProjectedScoreChange(newScores: StudentScores): void {
    let newProjectedData = clone(this.props.projectedStudentData);
    newProjectedData.scores = newScores;
    this.props.onProjectedStudentDataChange(newProjectedData);
  }

  private inferEffortLevel(studentData: StudentData, projectedData: StudentData): EffortLevel {
    // calculate percentile change from previous studentData
    const percentileChange = getAveragePercentileDifference(studentData.scores, 
      studentData.gradeLevel, 
      projectedData.scores,
      projectedData.gradeLevel);
    // convert percentileChange to effortLevel
    return this.toEffortLevel(percentileChange);
  }

  render() {
    return (
      <div style={{width: "350px"}}>
        <div className="effort-level-select-container" style={{width: "100%", textAlign: "center", margin: "1em 0", lineHeight: "150%", fontSize: "140%", color: "#777"}}>
          {"Here's what your report card will look like if you "}
          <EffortLevelSelector
            effortLevel={this.inferEffortLevel(this.props.studentData, this.props.projectedStudentData)}
            onEffortLevelChange={this.handleEffortLevelChange.bind(this)}
          />
        </div>
        <ReportCard
          gradeLevel={7}
          scores={this.props.projectedStudentData.scores}
          onScoresChange={this.handleProjectedScoreChange.bind(this)}
          studentName={this.props.studentData.studentFirstName + " " + this.props.studentData.studentLastName}
        />
      </div>
    );
  }
};

export default ReportCardContainer;
