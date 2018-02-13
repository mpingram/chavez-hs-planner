import * as React from "react";

import HSProgram from "shared/types/hs-program";
import SuccessChance from "shared/enums/success-chance";
import SchoolIcon from "shared/components/icons/school";

import HSProgramInfoCard from "./hs-program-info-card";

interface HSProgramElemProps {
  program: HSProgram
  selected: boolean
  onSelect: (id: string) => any
}

interface HSProgramElemState {
  showHSPreview: boolean
  pxFromTop: number
  combinedSuccessChance: SuccessChance
}

import "./hs-program-element.scss";

class HSProgramElement extends React.PureComponent<HSProgramElemProps, HSProgramElemState> {

  constructor(props) {
    super(props);
    this.state = { 
      combinedSuccessChance: this.getCombinedSuccessChance(props.program),
      showHSPreview: props.selected,
      pxFromTop: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showHSPreview: nextProps.selected,
      combinedSuccessChance: this.getCombinedSuccessChance(nextProps.program)
    });
  }

  render() {
    const IconClassName = `hs-list-element-icon ${this.outcomeToClassName(this.state.combinedSuccessChance)}`;
    return (
      <div>
        <button 
          className={"hs-list-element" + " " + (this.props.selected ? "selected" : "")}
          ref={ ref => {
            if (ref) { 
              this.setState({pxFromTop: ref.offsetTop + 60 });
            }
          } }
          onClick={(ev) => {
            this.props.onSelect(this.props.program.id);
          } }
        >
          <div className={IconClassName}>
            { this.state.combinedSuccessChance !== SuccessChance.NOTIMPLEMENTED &&
            <SchoolIcon width="45px" height="45px" color="#000"/>
            }
          </div>
          <div className="hs-list-element-shortname">
            {this.props.program.shortname}
          </div>
        </button>
        <HSProgramInfoCard 
          visible={this.state.showHSPreview} 
          program={this.props.program}
          style={{top: this.state.pxFromTop}}
          onCloseButtonClick={ ev => this.props.onSelect(null) }
        />
      </div>
    )
  }

  private getCombinedSuccessChance = (program: HSProgram) => {
    if (program.applicationOutcome === SuccessChance.CERTAIN || 
      program.applicationOutcome === SuccessChance.LIKELY) {
      return program.selectionOutcome;
    } else {
      return program.applicationOutcome;
    }
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
