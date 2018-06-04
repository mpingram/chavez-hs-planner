import * as React from "react"

import Form from "shared/components/layout/form";
import SubForm from "shared/components/layout/sub-form";

import {
  IEPFieldContainer,
  ELLFieldContainer,
  StudentLocationFieldContainer,
  SkippedGradeFieldContainer,
  AttendPercentageFieldContainer,
  CurrESProgramFieldContainer,
  SiblingHSFieldContainer,
  NWEAMathFieldContainer,
  NWEAReadFieldContainer,
  GPADisplayFieldContainer,
  SubjGradeMathFieldContainer,
  SubjGradeReadFieldContainer,
  SubjGradeSciFieldContainer,
  SubjGradeSocStudiesFieldContainer,
  SETestFieldContainer,
} from "./fields";


const StudentDataForm = (props) => {

  return (
    <Form>
      <SubForm label="Your student information">
        <IEPFieldContainer/>
        <ELLFieldContainer/>
        <SkippedGradeFieldContainer/>
        <StudentLocationFieldContainer/>
        <AttendPercentageFieldContainer/>
        <CurrESProgramFieldContainer/>
        <SiblingHSFieldContainer/>
      </SubForm>
      <SubForm label="Your grades">
        <NWEAMathFieldContainer/>
        <NWEAReadFieldContainer/>
        <SubjGradeMathFieldContainer/>
        <SubjGradeReadFieldContainer/>
        <SubjGradeSciFieldContainer/>
        <SubjGradeSocStudiesFieldContainer/>
        <SETestFieldContainer/>
        <GPADisplayFieldContainer/>
      </SubForm>
    </Form>
  );
};

export default StudentDataForm;
