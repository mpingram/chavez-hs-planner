import * as React from "react"

import { Program } from "shared/types";

import Select from "react-select";

import "./student-data-form.scss";

interface StudentDataFormProps {
  debounce?: number

  addressIsLoading?: boolean

  currEsProgramOptions: string[]
  siblingHSSchoolOptions: string[]

  iep: boolean | null
  onIEPChange: (newVal: boolean) => any
  el: boolean | null
  onELChange: (newVal: boolean) => any
  skip7OrRepeat8: boolean | null
  onSkip7OrRepeat8Change: (newVal: boolean) => any
  currESProgram: string | null
  onCurrESProgramChange: (newVal: string) => any
  siblingHSSchools: string
  onSiblingHSSchoolChange: (newVal: string) => any

  nweaMath: number | null
  onNWEAMathChange: (newVal: number) => any
  nweaRead: number | null
  onNWEAReadChange: (newVal: number) => any
  mathGrade: string | null 
  onMathGradeChange: (newVal: string) => any
  readingGrade: string | null
  onReadingGradeChange: (newVal: string) => any
  scienceGrade: string | null
  onScienceGradeChange: (newVal: string) => any
  socialStudiesGrade: string | null
  onSocialStudiesGradeChange: (newVal: string) => any

}
const StudentDataForm: React.SFC<StudentDataFormProps> = (props) => {
  return (
    <div className="student-data-form">
        <div className="field-group">
          <div className="field fixed-width-small">
            <label className="label is-small multiline">Do you have an IEP?</label>
            <div className="control">
              <div className="select is-small">
                
                <select 
                  defaultValue="placeholder" 
                  onChange={ (ev) => ev.currentTarget.value === "yes" ? props.onIEPChange(true) : props.onIEPChange(false) }
                >
                  <option value="placeholder" disabled></option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="unsure">I don't know</option>
                </select>

              </div>
            </div>
          </div>

          <div className="field fixed-width-small">
            <label className="label is-small multiline">Are you an English Learner student?</label>
            <div className="control">
              <div className="select is-small">

                <select 
                  defaultValue="placeholder" 
                  onChange={ (ev) => ev.currentTarget.value === "yes" ? props.onIEPChange(true) : props.onIEPChange(false) }
                >
                  <option value="placeholder" disabled selected></option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="unsure">I don't know</option>
                </select>

              </div>
            </div>
          </div>

          <div className="field fixed-width-small">
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

          <div className="field control is-expanded">
            <label className="label is-small">Your address</label>
            <div className="field has-addons">
              <div className="control is-expanded">
                
                <input className="input is-small" type="text" placeholder="42 Wallaby Way" />

              </div>
              <div className="control">
                <div className="button is-static is-small">
                  Chicago, IL
                </div>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label is-small">CPS Tier</label>
            <div className="field">
              <div className={`control is-small tier-display-input ${props.addressIsLoading ? 'is-loading' : ''}`}>

                <input readOnly disabled className="input is-small" type="text" />

              </div>
            </div>
          </div>
        </div>
          
        <div className="field">
          <label className="label is-small">What elementary school are you in now?</label>
          <div className="control is-small">

            <Select placeholder=""/>

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

            <Select placeholder=""/>

          </div>
        </div>

        <div className="field-group">
          <div className="field">
            <label className="label is-small">NWEA Math percentile</label>
            <div className="control">

              <input className="input" type="number" />

            </div>
          </div>

          <div className="field">
            <label className="label is-small">NWEA Reading percentile</label>
            <div className="control">

              <input className="input" type="number" />

            </div>
          </div>
        </div>

        <div className="field-group">
          <div className="field fixed-width-small">
            <label className="label is-small">Math</label>
            <div className="control">
              <div className="select">

                <select>
                  <option value="placeholder" disabled selected></option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>

              </div>
            </div>
          </div>

          <div className="field fixed-width-small">
            <label className="label is-small">Reading</label>
            <div className="control">
              <div className="select">

                <select>
                  <option value="placeholder" disabled selected></option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>

              </div>
            </div>
          </div>

          <div className="field fixed-width-small">
            <label className="label is-small">Science</label>
            <div className="control">
              <div className="select">

                <select>
                  <option value="placeholder" disabled selected></option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>

              </div>
            </div>
          </div>

          <div className="field">
            <label className="label is-small">Social Studies</label>
            <div className="control">
              <div className="select">

                <select>
                  <option value="placeholder" disabled selected></option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>

              </div>
            </div>
          </div>
        </div>
  </div>
  );
};

export default StudentDataForm;
