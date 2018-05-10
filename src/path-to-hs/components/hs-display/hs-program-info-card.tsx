import * as React from "react";

import {
  Program,
  ProgramOutcome
} from "shared/types";

import {
  SuccessChance
}from "shared/enums";

import "./hs-program-info-card.scss";

interface HSInfoCardProps {
  program: Program 
  outcome: ProgramOutcome
  visible: boolean
  style: Object
  onCloseButtonClick: React.MouseEventHandler<HTMLButtonElement>
}

const HSProgramInfoCard = (props: HSInfoCardProps) => {
  
  const toMessage = (success: SuccessChance): string => {
    let msg: string = "";
    switch(success) {
        case SuccessChance.CERTAIN:
          msg = "You meet this requirement.";
        break;
        case SuccessChance.LIKELY:
          msg = "You are more likely to meet this requirement than other people who apply.";
        break;
        case SuccessChance.UNCERTAIN:
          msg = "You are just as likely to meet this requirement as everyone else.";
        break;
        case SuccessChance.UNLIKELY:
          msg = "You are less likely to meet this requirement than other people who apply."
        break;
        case SuccessChance.NONE:
          msg = "You do not meet this requirement.";
        break;
        case SuccessChance.NOTIMPLEMENTED:
          msg = "We don't know enough about this requirement to tell you.";
        default:
          msg = "We don't know enough about this requirement to tell you.";
          console.error(`Unrecognized SuccessChance ${success.toString()} at program ${props.program.programName}`);
        break;
    }
    return msg;
  };

  return (
    <div 
      style={props.style} 
      className={`hs-info-card-container ${props.visible ? "visible" : "" }`}
    >
      <div className="hs-info-card">
        <button 
          className="hs-info-card-close-button"
          onClick={props.onCloseButtonClick}
        >
          X
        </button>
        <div className="hs-info-card-program-name">
          { props.program.programName }
        </div>
        <div className="hs-info-card-requirement-container">
          <div className="hs-info-card-requirement">
            <div className="hs-info-card-req-desc-container">
              <div className="hs-info-card-req-type">
                To Apply:
              </div>
              <div className="hs-info-card-req-desc">
                {props.program.applicationReqDescription}
              </div>
            </div>
            <div className="hs-info-card-req-success">
              {toMessage(props.outcome.applicationChance)}
            </div>
          </div>
          <div className="hs-info-card-requirement">
            <div className="hs-info-card-req-desc-container">
              <div className="hs-info-card-req-type">
                To Be Selected:
              </div>
              <div className="hs-info-card-req-desc">
                {props.program.selectionReqDescription}
              </div>
            </div>
            <div className="hs-info-card-req-success">
              {toMessage(props.outcome.selectionChance)}
            </div>
          </div>
        </div>
        <div className="hs-links-container">
          <a className="hs-link" target="_none" href={props.program.cpsPageURL}>CPS School Page</a>
          <a className="hs-link" target="_none" href={props.program.schoolPageURL}>School Website</a>
          <a className="hs-link" target="_none" href={props.program.hsBoundURL}>HS Bound School Page</a>
        </div>
      </div>
    </div>
    );
  } ;

export default HSProgramInfoCard;
