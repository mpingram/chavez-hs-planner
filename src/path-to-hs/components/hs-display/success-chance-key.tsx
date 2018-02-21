import * as React from "react";

import OutcomeCertainIcon from "shared/components/icons/outcome-certain";
import OutcomeLikelyIcon from "shared/components/icons/outcome-likely";
import OutcomeUncertainIcon from "shared/components/icons/outcome-uncertain";
import OutcomeUnlikelyIcon from "shared/components/icons/outcome-unlikely";
import OutcomeNoneIcon from "shared/components/icons/outcome-none";
import OutcomeNotImplementedIcon from "shared/components/icons/outcome-notimplemented";
import {
  OutcomeCertainColor,
  OutcomeLikelyColor,
  OutcomeUncertainColor,
  OutcomeUnlikelyColor,
  OutcomeNoneColor,
  OutcomeNotImplementedColor } from "shared/constants";

import "./success-chance-key.scss";

const SuccessChanceKey = (props) => {
  return (
    <div className="hs-program-success-chance-key">
      <div className="hs-program-success-chance-example">
        <OutcomeCertainIcon color={OutcomeCertainColor} width="48px" height="48px"/>
        You will almost certainly be accepted.
      </div>
      <div className="hs-program-success-chance-example">
        <OutcomeLikelyIcon color={OutcomeLikelyColor} width="48px" height="48px"/>
        You're more likely to be accepted than other students.
      </div>
      <div className="hs-program-success-chance-example">
        <OutcomeUncertainIcon color={OutcomeUncertainColor} width="48px" height="48px"/>
        You're about as likely to be accepted as other students.
      </div>
      <div className="hs-program-success-chance-example">
        <OutcomeUnlikelyIcon color={OutcomeUnlikelyColor} width="48px" height="48px"/>
        You're less likely to be accepted than other students.
      </div>
      <div className="hs-program-success-chance-example">
        <OutcomeNoneIcon color={OutcomeNoneColor} width="48px" height="48px"/>
        You probably won't be accepted.
      </div>
      <div className="hs-program-success-chance-example">
        <OutcomeNotImplementedIcon color={OutcomeNotImplementedColor} width="48px" height="48px"/>
        There isn't enough information to give an answer.
      </div>
    </div>
  )
};

export default SuccessChanceKey;
