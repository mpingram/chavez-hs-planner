import * as React from "react";

import { 
  Program, 
  ProgramOutcome
} from "shared/types";
import { SuccessChance } from "shared/enums";

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
  outcome: ProgramOutcome
  selected: boolean
  onSelect: (id: string | null) => any
}

interface HSProgramElemState {
  showHSPreview: boolean
  visited: boolean
  pxFromTop: number
  combinedSuccessChance: SuccessChance
}

import "./hs-program-element.scss";

class HSProgramElement extends React.PureComponent<HSProgramElemProps, HSProgramElemState> {

  constructor(props) {
    super(props);
    this.state = { 
      visited: false,
      combinedSuccessChance: props.outcome.overallChance,
      showHSPreview: props.selected,
      pxFromTop: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showHSPreview: nextProps.selected,
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
      <div>
        <button 
          className={"hs-list-element" + " " + (this.props.selected ? "selected" : "")}
          ref={ ref => {
            if (ref) { 
              this.setState({ pxFromTop: ref.offsetTop + 60 });
            }
          } }
          onClick={(ev) => {
            this.setState({visited: true});
            this.props.onSelect(this.props.program.id);
            console.log(this.state);
          } }
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
        <HSProgramInfoCard 
          visible={this.state.showHSPreview} 
          program={this.props.program}
          outcome={this.props.outcome}
          style={{top: this.state.pxFromTop}}
          onCloseButtonClick={ ev => this.props.onSelect(null) }
        />
      </div>
    )
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
