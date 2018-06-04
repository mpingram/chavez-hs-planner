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
const NWEAMathField: React.SFC<ScoreFieldProps> = (props) => {
  return (
      <NumberField
        label="NWEA Math percentile"
        style={{width: "4em"}}
        value={props.value}
        onChange={props.onChange}
        limiter={between(1, 99)}
        debounceTime={INPUT_DEBOUNCE_TIME}
      />
  )
}

export const NWEAMathFieldContainer = connectScoreType(ScoreType.nweaPercentileMath)(NWEAMathField);

