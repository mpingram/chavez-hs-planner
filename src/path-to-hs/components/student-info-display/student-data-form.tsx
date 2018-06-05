import * as React from "react"

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

import { withDebounce } from "shared/util/with-debounce";

import "./student-data-form.scss";

const StudentDataForm = (props) => {
  return (
    <div className="student-data-form">
      <div className="field">
        <label className="label">Do you have an IEP?</label>
        <div className="control">
          <div className="select">
            <select>
              <option>Yes</option>
              <option>No</option>
              <option>I don't know</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDataForm;
