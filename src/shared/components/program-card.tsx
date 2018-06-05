import * as React from "react";

import { SuccessChance } from "shared/enums";

interface ProgramCardProps {
  outcome: SuccessChance
  displayName: string
}

import SchoolIcon from "shared/components/icons/school";

import OutcomeCertainIcon from "shared/components/icons/outcome-certain";
import OutcomeLikelyIcon from "shared/components/icons/outcome-likely";
import OutcomeUncertainIcon from "shared/components/icons/outcome-uncertain";
import OutcomeUnlikelyIcon from "shared/components/icons/outcome-unlikely";
import OutcomeNoneIcon from "shared/components/icons/outcome-none";
import OutcomeNotImplementedIcon from "shared/components/icons/outcome-notimplemented";

import "./program-card.scss";

export const ProgramCard: React.SFC<ProgramCardProps> = (props) => {

  const getIcon = (outcome: SuccessChance) => {
    const width="24px";
    const height="24px";
    switch(outcome) {
      case SuccessChance.CERTAIN:
        return <OutcomeCertainIcon width={width} height={height}/>;
      case SuccessChance.LIKELY:
        return <OutcomeLikelyIcon width={width} height={height}/>;
      case SuccessChance.UNCERTAIN:
        return <OutcomeUncertainIcon width={width} height={height}/>;
      case SuccessChance.UNLIKELY:
        return <OutcomeUnlikelyIcon width={width} height={height}/>;
      case SuccessChance.NONE:
        return <OutcomeNoneIcon width={width} height={height}/>;
      case SuccessChance.NOTIMPLEMENTED:
        return <OutcomeNotImplementedIcon width={width} height={height}/>;
    }
  };

  const getClassName = (outcome: SuccessChance) => {
    switch(outcome){
      case SuccessChance.CERTAIN:
        return "succ-certain"
      case SuccessChance.LIKELY:
        return "succ-likely"
      case SuccessChance.UNCERTAIN:
        return "succ-uncertain"
      case SuccessChance.UNLIKELY:
        return "succ-unlikely"
      case SuccessChance.NONE:
        return "succ-none"
      case SuccessChance.NOTIMPLEMENTED:
        return "succ-not-implemented"
      default:
        return "succ-not-implemented"
    }
  };
  
  const iconClassName = `program-card-icon ${getClassName(props.outcome)}`;

  return (
    <div className="program-card">
      <div className="program-card-icon-container">
        { getIcon(props.outcome) }
      </div>
      <div className={iconClassName}>
        { props.outcome !== SuccessChance.NOTIMPLEMENTED &&
        <SchoolIcon width="45px" height="45px" color="#000"/>
        }
      </div>
      <div className='program-card-displayname'>
        {props.displayName}
      </div>
    </div>
  )

}
