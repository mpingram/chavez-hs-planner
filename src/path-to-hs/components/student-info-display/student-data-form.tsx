import * as React from "react"

import Select from "react-select";

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

      <div className="field is-grouped distribute">

        <div className="field width-small">
          <label className="label is-small multiline">Do you have an IEP?</label>
          <div className="control">
            <div className="select is-small">
              <select>
                <option value="placeholder" disabled selected></option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="unsure">I don't know</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field width-small">
          <label className="label is-small multiline">Are you an English Learner student?</label>
          <div className="control">
            <div className="select is-small">
              <select>
                <option value="placeholder" disabled selected></option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="unsure">I don't know</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field width-small">
          <label className="label is-small multiline">Did you skip 7th grade or repeat 8th grade?</label>
          <div className="control">
            <div className="select is-small">
              <select>
                <option value="placeholder" disabled selected></option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="unsure">I don't know</option>
              </select>
            </div>
          </div>
        </div>

      </div>

      <div className="field is-grouped">

        <div className="field">
          <label className="label is-small">Your address</label>
          <div className="field has-addons">
            <div className="control">
              <input className="input is-small" type="text" placeholder="42 Wallaby Way" />
            </div>
            <div className="control">
              <div className="button is-static is-small">
                Chicago, IL
              </div>
            </div>
          </div>
        </div>

        <div className="field is-expanded">
          <label className="label is-small">CPS Tier</label>
          <div className="field">
            <div className="control is-small is-loading tier-display-input">
              <input readOnly disabled className="input is-small" type="text" />
            </div>
          </div>
        </div>

      </div>
        
      <div className="field">
        <label className="label is-small">What elementary school are you in now?</label>
        <div className="control is-small">
          <Select/>
        </div>
      </div>

      <div className="field">
        <label className="label is-small">Do you have a brother or sister at a CPS high school?</label>
          <div className="control">
            <div className="select is-small">
              <select>
                <option value="placeholder" disabled selected></option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
      </div>

      <div className="field">
        <label className="label is-small">Which high school does your brother or sister go to?</label>
          <div className="control is-small">
            <Select />
          </div>
      </div>
  </div>
  );
};

export default StudentDataForm;
