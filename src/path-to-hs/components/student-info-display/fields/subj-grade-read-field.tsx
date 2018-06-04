import * as React from "react";

import { INPUT_DEBOUNCE_TIME } from "shared/constants";
import { LetterGrade } from "shared/types";
import { ScoreType } from "shared/enums";
import { connectScoreType } from "./connect-score-type";

import DropdownField from "shared/components/ui/fields/dropdown-field";

interface GradeFieldProps {
  value: LetterGrade | null
  onChange: (newValue: LetterGrade) => any
}
const SubjGradeReadField: React.SFC<GradeFieldProps> = (props) => {
  return <DropdownField
    label="Reading Grade"
    value={props.value}
    onChange={props.onChange}
    debounceTime={INPUT_DEBOUNCE_TIME}
  >
    <option value="A">A</option>
    <option value="B">B</option>
    <option value="C">C</option>
    <option value="D">D</option>
    <option value="F">F</option>
  </DropdownField>
}

export const SubjGradeReadFieldContainer = connectScoreType(ScoreType.subjGradeRead)(SubjGradeReadField);
