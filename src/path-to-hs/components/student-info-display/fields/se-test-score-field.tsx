import * as React from "react";

import { INPUT_DEBOUNCE_TIME } from "shared/constants";
import between from "shared/util/limiters/between";
import { ScoreType } from "shared/enums";
import { connectScoreType } from "./connect-score-type";

import NumberField from "shared/components/ui/fields/number-field";

interface ScoreFieldProps {
  value: number | null
  onChange: (newValue: number) => any
}
const SETestField: React.SFC<ScoreFieldProps> = (props) => {
  return <NumberField
    label="Selective Enrollment Test Percentile"
    value={props.value}
    onChange={props.onChange}
    limiter={between(1, 99)}
    debounceTime={INPUT_DEBOUNCE_TIME}
  />
}

export const SETestFieldContainer = connectScoreType(ScoreType.seTestPercentile)(SETestField);
