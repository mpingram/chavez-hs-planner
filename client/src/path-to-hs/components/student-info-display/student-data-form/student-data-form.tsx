import * as React from "react"

import StudentData from "shared/types/student-data";
import CPSProgram from "shared/types/cps-program";
import {StudentDataFormStrings as strings} from "shared/l10n/strings";
import {cloneAndExtend} from "shared/util/clone";
import ScoreType from "shared/enums/score-type";
import ValidationState from "shared/enums/validation-state";
import Gender from "shared/enums/gender";

import {scoreToString, tryParseScore} from "shared/util/grade-convert";

import DropdownField from "shared/components/ui/fields/dropdown-field";
import ComboBoxField from "shared/components/ui/fields/combo-box-field";
import MultiSelectField from "shared/components/ui/fields/multi-select-field";
import TextField from "shared/components/ui/fields/text-field";
import NumberField from "shared/components/ui/fields/number-field";

import AddressTierCalculator from "./address-tier-calculator";

import {getESPrograms, getHSPrograms} from "shared/util/data-access";
const alphaSort = (a: CPSProgram, b: CPSProgram) => {
  if (a.Short_Name < b.Short_Name) {
    return -1;
  } else if (a.Short_Name === b.Short_Name) {
    return 0;
  } else if (a.Short_Name > b.Short_Name) {
    return 1;
  }
};
const esPrograms: Array<CPSProgram> = getESPrograms().sort( alphaSort );
const hsPrograms: Array<CPSProgram> = getHSPrograms().sort( alphaSort );

import "./student-data-form.scss";

interface StudentDataFormProps {
  studentData: StudentData
  onChange: (data: StudentData) => any
}

const StudentDataForm = (props: StudentDataFormProps) => {

  const updateStudentData = (prop: string, value: any): void => {
    console.log(`${prop}: ${value}`);
    if (props.studentData[prop] !== value) {
      const newStudentData = cloneAndExtend(props.studentData, {[prop]: value});
      props.onChange(newStudentData);
    }
  };

  const updateStudentScores = (prop: string, value: number): void => {
    if (props.studentData.scores[prop] !== value) {
      const newStudentScores = cloneAndExtend(props.studentData.scores, {[prop]: value}); 
      const newStudentData = cloneAndExtend(props.studentData, {scores: newStudentScores});
      props.onChange(newStudentData);
    }
  };

  console.log(props.studentData);
  return (
    <div className="student-data-form">
      <div className="student-data-form-subheader"> 
        Your student information 
      </div>
      <div className="student-data-form-subform">
          <DropdownField
            label="What grade are you in?"
            value={props.studentData.gradeLevel.toString()}
            onChange={grade => updateStudentData("gradeLevel", grade)}
          >
            <option value="4">4th grade</option>
            <option value="5">5th grade</option>
            <option value="6">6th grade</option>
            <option value="7">7th grade</option>
            <option value="8">8th grade</option>
          </DropdownField>
          <DropdownField
            label="What's your gender?"
            value={props.studentData.gender.toString()}
            onChange={gender => updateStudentData("gender", gender)}
          >
            <option value={Gender.MALE.toString()}>Boy</option>
            <option value={Gender.FEMALE.toString()}>Girl</option>
            <option value={Gender.OTHER.toString()}>Other</option>
            <option value={Gender.NOANSWER.toString()}>Prefer not to answer</option>
          </DropdownField>

          <DropdownField
            label="Do you have an IEP?"
            value={props.studentData.iep ? "true" : "false"}
            onChange={iep => updateStudentData("iep", iep === "true" ? true : false)}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </DropdownField>

          <DropdownField
            label="Are you an English Language Learner?"
            value={props.studentData.ell ? "true" : "false"}
            onChange={ell => updateStudentData("ell", ell === "true" ? true : false)}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </DropdownField>

          <ComboBoxField
            label="What elementary school program are you in now?"
            value={props.studentData.currESProgram}
            data={{records: esPrograms, getKey: (program) => program.ID, getDisplayText: (program) => program.Short_Name + " - " + program.Program_Type }}
            onChange={currESProgram => updateStudentData("currESProgram", currESProgram)}
          /> 

          <MultiSelectField
            label="Do you have a sibling in high school? If so, which school?"
            values={props.studentData.siblingHSPrograms}
            data={{records: hsPrograms, getKey: (program) => program.ID, getDisplayText: (program) => program.Short_Name + " - " + program.Program_Type }}
            onChange={siblingHSPrograms => updateStudentData("siblingHSPrograms", siblingHSPrograms)}
          /> 
          
          <AddressTierCalculator
            address={props.studentData.address}
            tier={props.studentData.tier}
            geolocation={props.studentData.geolocation}
            onAddressChange={ address => updateStudentData("address", address) }
            onTierChange={ tier => updateStudentData("tier", tier) }
            onGeolocationChange={geolocation => updateStudentData("geolocation", geolocation)}
          />

          <NumberField
            label="Your 7th grade attendance percentage"
            value={props.studentData.attendancePercentage}
            onChange={ attendancePercentage => updateStudentData("attendancePercentage", attendancePercentage) }
            restrictor={ value => value >= 0 && value <= 99}
          />
      </div>

      <div className="student-data-form-subheader">
        Your grades
      </div>
      <div className="student-data-form-subform">

        <NumberField
          label="NWEA Math percentile"
          value={props.studentData.scores.nweaPercentileMath}
          onChange={ nweaPercentileMath => updateStudentScores("nweaPercentileMath", nweaPercentileMath) }
          restrictor={ value => value >= 1 && value <= 99}
        />

        <NumberField
          label="NWEA Reading percentile"
          value={props.studentData.scores.nweaPercentileRead}
          onChange={ nweaPercentileRead => updateStudentScores("nweaPercentileRead", nweaPercentileRead) }
          restrictor={ value => value >= 1 && value <= 99 }
        />

        <NumberField
          label="Your Math grade"
          value={props.studentData.scores.subjGradeMath}
          onChange={ subjGradeMath => updateStudentScores("subjGradeMath", subjGradeMath) }
          restrictor={ value => value >= 0 && value <= 100 }
          />

        <NumberField
          label="Your Reading grade"
          value={props.studentData.scores.subjGradeRead}
          onChange={ subjGradeRead => updateStudentScores("subjGradeRead", subjGradeRead) }
          restrictor={ value => value >= 0 && value <= 100 }
        />

        <NumberField
          label="Your Science grade"
          value={props.studentData.scores.subjGradeSci}
          onChange={ subjGradeSci => updateStudentScores("subjGradeSci", subjGradeSci) }
          restrictor={ value => value >= 0 && value <= 100 }
        />

        <NumberField
          label="Your Social Studies grade"
          value={props.studentData.scores.subjGradeSocStudies}
          onChange={ subjGradeSocStudies => updateStudentScores("subjGradeSocStudies", subjGradeSocStudies) }
          restrictor={ value => value >= 0 && value <= 100 }
        />

        <NumberField
          label="Your Selective Enrollment test percentile"
          value={props.studentData.seTestPercentile}
          onChange={ seTestPercentile => updateStudentData("seTestPercentile", seTestPercentile) }
          restrictor={ value => value >= 0 && value <= 100 }
        />
      </div>
    </div>
  );
}

export default StudentDataForm;
