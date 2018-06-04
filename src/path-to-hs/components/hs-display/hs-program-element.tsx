import * as React from "react";

import { 
  Program, 
  ProgramOutcome
} from "shared/types";
import { SuccessChance } from "shared/enums";

import { shallowCompare } from "shared/util/shallow-compare";

import SchoolIcon from "shared/components/icons/school";
import OutcomeCertainIcon from "shared/components/icons/outcome-certain";
import OutcomeLikelyIcon from "shared/components/icons/outcome-likely";
import OutcomeUncertainIcon from "shared/components/icons/outcome-uncertain";
import OutcomeUnlikelyIcon from "shared/components/icons/outcome-unlikely";
import OutcomeNoneIcon from "shared/components/icons/outcome-none";
import OutcomeNotImplementedIcon from "shared/components/icons/outcome-notimplemented";

import HSProgramInfoCard from "./hs-program-info-card";

interface HSProgramElemProps {
  program: Program
  outcome: ProgramOutcome | undefined
  onSelect: (program: Program, outcome: ProgramOutcome | undefined) => any
}

interface HSProgramElemState {
  visited: boolean
  combinedSuccessChance: SuccessChance
}

import "./hs-program-element.scss";

class HSProgramElement extends React.Component<HSProgramElemProps, HSProgramElemState> {

  constructor(props) {
    super(props);
    this.state = { 
      visited: false,
      combinedSuccessChance: props.outcome === undefined ? SuccessChance.NOTIMPLEMENTED : props.outcome.overallChance,
    };
  }

  shouldComponentUpdate(nextProps: HSProgramElemProps, nextState: HSProgramElemState) {
    // assume props.program does not change
    
    // compare props.onSelect
    if (nextProps.onSelect !== this.props.onSelect) {
      return true;
    }
   
    // shallow compare outcome
    if (nextProps.outcome === undefined || this.props.outcome === undefined) {
      if (nextProps.outcome !== this.props.outcome) {
        return true;
      }
    } else {
      if (shallowCompare(nextProps.outcome, this.props.outcome) === false) {
        return true;
      }
    }

    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      combinedSuccessChance: nextProps.outcome.overallChance
    });
  }

  getIcon(outcome: SuccessChance) {
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
  }

  render() {
    const IconClassName = `hs-list-element-icon ${this.outcomeToClassName(this.state.combinedSuccessChance)}`;

    return (
      <button 
        className="hs-list-element"
        onClick={this.handleClick}
      >
        <div className="outcome-icon-container">
          { this.getIcon(this.state.combinedSuccessChance) }
        </div>
        <div className={IconClassName}>
          { this.state.combinedSuccessChance !== SuccessChance.NOTIMPLEMENTED &&
          <SchoolIcon width="45px" height="45px" color="#000"/>
          }
        </div>
        <div className={`hs-list-element-shortname ${this.state.visited ? "visited" : ""}`}>
          {this.props.program.schoolNameShort}
        </div>
      </button>
    )
  }

  private handleClick = (ev) => {
    this.setState({visited: true});
    this.props.onSelect(this.props.program, this.props.outcome);
  }

  private outcomeToClassName = (outcome: SuccessChance) => {
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
  }
}

export default HSProgramElement;
