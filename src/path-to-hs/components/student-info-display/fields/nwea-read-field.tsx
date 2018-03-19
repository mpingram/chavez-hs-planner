import * as React from "react";

import { INPUT_DEBOUNCE_TIME } from "shared/constants";
import between from "shared/util/limiters/between";
import ScoreType from "shared/enums/score-type";
import {connectScoreType} from "./connect-score-type";

import {percentileToRit, ritToPercentile, NWEATestType} from "shared/util/nwea-convert"; 
import NumberField from "shared/components/ui/fields/number-field";

const toPercentile = (val) => 1;

const Field = (props) => {
  return (
  <div>
    <NumberField
      label="NWEA Reading percentile"
      value={props.value}
      onChange={props.onChange}
      limiter={between(1, 99)}
      debounceTime={INPUT_DEBOUNCE_TIME}
    />
    <NumberField
      label="NWEA Reading RIT score"
      value={percentileToRit(
        props.value,
        NWEATestType.Reading,
        props.gradeLevel
      )}
      onChange={ value => props.onChange(ritToPercentile(
        value,
        NWEATestType.Reading,
        props.gradeLevel
      ))}
      limiter={between(1, 350)}
      debounceTime={INPUT_DEBOUNCE_TIME}
    />
  </div>
  );
};

export const NWEAReadField = connectScoreType(ScoreType.nweaPercentileRead)(Field);

