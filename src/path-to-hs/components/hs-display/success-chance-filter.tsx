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
  OutcomeNotImplementedColor,
  OutcomeInactiveColor
} from "shared/constants";

import "./success-chance-filter.scss";

interface SuccessChanceFilterProps {
  succCertainActive: boolean
  onSuccCertainClick: React.MouseEventHandler<HTMLButtonElement>
  succLikelyActive: boolean
  onSuccLikelyClick: React.MouseEventHandler<HTMLButtonElement>
  succUncertainActive: boolean
  onSuccUncertainClick: React.MouseEventHandler<HTMLButtonElement>
  succUnlikelyActive: boolean
  onSuccUnlikelyClick: React.MouseEventHandler<HTMLButtonElement>
  succNoneActive: boolean
  onSuccNoneClick: React.MouseEventHandler<HTMLButtonElement>
  succNotImplementedActive: boolean
  onSuccNotImplementedClick: React.MouseEventHandler<HTMLButtonElement>
}

const ICON_SIZE = "48px";

const SuccessChanceFilter: React.SFC<SuccessChanceFilterProps> = (props) => {
  return (
    <div className="success-chance-filter">
      <button 
        className="success-chance-filter-button"
        onClick={props.onSuccCertainClick}
      >
        <OutcomeCertainIcon 
          color={props.succCertainActive ? OutcomeCertainColor : OutcomeInactiveColor } 
          width={ICON_SIZE} 
          height={ICON_SIZE}
        />
        You will almost certainly be accepted.
      </button>
      <button 
        className="hs-program-success-chance-example"
        onClick={props.onSuccLikelyClick}
      >
        <OutcomeLikelyIcon 
          color={props.succLikelyActive ? OutcomeLikelyColor : OutcomeInactiveColor } 
          width={ICON_SIZE} 
          height={ICON_SIZE}
        />
        You're more likely to be accepted than other students.
      </button>
      <button 
        className="hs-program-success-chance-example"
        onClick={props.onSuccUncertainClick}
      >
        <OutcomeUncertainIcon
          color={props.succUncertainActive ? OutcomeUncertainColor : OutcomeInactiveColor } 
          width={ICON_SIZE} 
          height={ICON_SIZE}
        />
        You're about as likely to be accepted as other students.
      </button>
      <button 
        className="hs-program-success-chance-example"
        onClick={props.onSuccUnlikelyClick}
      >
        <OutcomeUnlikelyIcon 
          color={props.succUnlikelyActive ? OutcomeUnlikelyColor : OutcomeInactiveColor } 
          width={ICON_SIZE} 
          height={ICON_SIZE}
        />
        You're less likely to be accepted than other students.
      </button>
      <button 
        className="hs-program-success-chance-example"
        onClick={props.onSuccNoneClick}
      >
        <OutcomeNoneIcon 
          color={props.succNoneActive ? OutcomeNoneColor : OutcomeInactiveColor } 
          width={ICON_SIZE} 
          height={ICON_SIZE}
        />
        You probably won't be accepted.
      </button>
      <button 
        className="hs-program-success-chance-example"
        onClick={props.onSuccNotImplementedClick}
      >
        <OutcomeNotImplementedIcon
          color={props.succNotImplementedActive ? OutcomeNotImplementedColor : OutcomeInactiveColor } 
          width={ICON_SIZE} 
          height={ICON_SIZE}
        />
        We don't have enough information to tell you.
      </button>
    </div>
  )
};

export default SuccessChanceFilter;
