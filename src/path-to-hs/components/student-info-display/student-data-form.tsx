import * as React from "react"

import Form from "shared/components/layout/form";
import SubForm from "shared/components/layout/sub-form";

import {
  IEPField,
  ELLField,
  GradeLevelField,
  LocationField,
  SkippedGradeField,
  AttendPercentageField,
  CurrESProgramField,
  SiblingHSProgramField,
  NWEAMathField,
  NWEAReadField,
  GPADisplay,
  SubjGradeMathField,
  SubjGradeReadField,
  SubjGradeSciField,
  SubjGradeSocStudiesField,
  SETestScoreField,
} from "./fields";


const StudentDataForm = (props) => {

  return (
    <Form>
      <SubForm label="Your student information">
        <GradeLevelField/>
        <IEPField/>
        <ELLField/>
        <SkippedGradeField/>
        <LocationField/>
        <AttendPercentageField/>
        <CurrESProgramField/>
        <SiblingHSProgramField/>
      </SubForm>
      <SubForm label="Your grades">
        <NWEAMathField/>
        <NWEAReadField/>
        <SubjGradeMathField/>
        <SubjGradeReadField/>
        <SubjGradeSciField/>
        <SubjGradeSocStudiesField/>
        <SETestScoreField/>
        <GPADisplay/>
      </SubForm>
    </Form>
  );
};

export default StudentDataForm;
