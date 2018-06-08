import * as React from "react";

import { LetterGrade } from "shared/types";

import "./grades-form.scss";

export interface GradesFormProps {
  nweaMath: number | null
  onNWEAMathChange: (newVal: number) => any
  nweaRead: number | null
  onNWEAReadChange: (newVal: number) => any

  mathGrade: LetterGrade | null
  onMathGradeChange: (newVal: LetterGrade) => any
  readGrade: LetterGrade | null
  onReadGradeChange: (newVal: LetterGrade) => any
  scienceGrade: LetterGrade | null
  onScienceGradeChange: (newVal: LetterGrade) => any
  socialStudiesGrade: LetterGrade | null
  onSocialStudiesGradeChange: (newVal: LetterGrade) => any
}

export const GradesForm: React.SFC<GradesFormProps> = (props) => {
  return (
    <div className="grades-form">
      <h3>Your grades</h3>
      <div className="field-group">
        <div className="field">
          <label className="label is-small">NWEA Math percentile</label>
          <div className="control">

            <input 
              value={props.nweaMath === null ? "" : props.nweaMath}
              onChange={ ev => props.onNWEAMathChange(ev.currentTarget.valueAsNumber) }
              className="input" 
              type="number" 
            />

          </div>
        </div>

        <div className="field">
          <label className="label is-small">NWEA Reading percentile</label>
          <div className="control">

          <input 
              value={props.nweaRead === null ? "" : props.nweaRead}
              onChange={ ev => props.onNWEAReadChange(ev.currentTarget.valueAsNumber) }
              className="input" 
              type="number" 
            />

          </div>
        </div>
      </div>

      <div className="field-group">
        <div className="field fixed-width-small">
          <label className="label is-small">Math</label>
          <div className="control">
            <div className="select">

              <select
                value={props.mathGrade === null ? "placeholder" : props.mathGrade}
                onChange={ ev => props.onMathGradeChange(ev.currentTarget.value as LetterGrade) }
              >
                <option value="placeholder" disabled></option>
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

              <select
                value={props.readGrade === null ? "placeholder" : props.readGrade}
                onChange={ ev => props.onReadGradeChange(ev.currentTarget.value as LetterGrade) }
              >
                <option value="placeholder" disabled></option>
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

              <select
                value={props.scienceGrade === null ? "placeholder" : props.scienceGrade}
                onChange={ ev => props.onScienceGradeChange(ev.currentTarget.value as LetterGrade) }
              >
                <option value="placeholder" disabled></option>
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

              <select
                value={props.socialStudiesGrade === null ? "placeholder" : props.socialStudiesGrade}
                onChange={ ev => props.onSocialStudiesGradeChange(ev.currentTarget.value as LetterGrade) }
              >
                <option value="placeholder" disabled></option>
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
}
