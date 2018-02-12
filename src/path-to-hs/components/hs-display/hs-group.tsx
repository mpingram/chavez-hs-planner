import * as React from "react";

import getCombinedSuccessChance from "shared/util/get-combined-success-chance";
import HSProgram from "shared/types/hs-program";
import SuccessChance from "shared/enums/success-chance";

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

import HSProgramElement from "./hs-program-element";

import "./hs-group.scss";

interface HSGroupProps {
  title: string
  programs: HSProgram[]
  selectedProgramID: string
  onSelectedProgramIDChange: (newID: string) => any
}

interface ProgramCounts {
  all: number
  certain: number
  likely: number
  uncertain: number
  unlikely: number
  none: number
  notImplemented: number
}


interface HSGroupState {
  collapsed: boolean
  programCounts: ProgramCounts
}

class HSGroup extends React.PureComponent<HSGroupProps, HSGroupState> {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      programCounts: this.getProgramCounts(props.programs)
    }
  }

  private getProgramCounts = (programs: HSProgram[]): ProgramCounts => {
    let counts: ProgramCounts = {
      all: 0,
      certain: 0,
      likely: 0,
      uncertain: 0,
      unlikely: 0,
      none: 0,
      notImplemented: 0
    };
    programs.forEach( program => {
      counts.all += 1;
      const outcome = getCombinedSuccessChance(program.applicationOutcome, program.selectionOutcome);
      switch(outcome){
        case SuccessChance.CERTAIN:
          counts.certain += 1;
          break;
        case SuccessChance.LIKELY:
          counts.likely += 1;
          break;
        case SuccessChance.UNCERTAIN:
          counts.uncertain += 1;
          break;
        case SuccessChance.UNLIKELY:
          counts.unlikely += 1;
          break;
        case SuccessChance.NONE:
          counts.none += 1;
          break;
        case SuccessChance.NOTIMPLEMENTED:
          counts.notImplemented += 1;
          break;
        default:
          console.warn("Unrecognized SuccessChance for program " + program.id);
          break;
      }
    });
    return counts;
  }

  private sortByOutcome = (a: HSProgram, b: HSProgram): number => {
    const aOutcome = getCombinedSuccessChance(a.applicationOutcome, a.selectionOutcome);
    const bOutcome = getCombinedSuccessChance(b.applicationOutcome, b.selectionOutcome);
    return bOutcome - aOutcome;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      programCounts: this.getProgramCounts(nextProps.programs)
    });
  }

  render() {
    const ICONSIZE = "18px";
    return (
      <div className={`hs-category-container ${this.state.collapsed ? "collapsed" : ""}`}>
        <div className="hs-category-header">
          <div className="hs-category-info-container">
            <div className="hs-category-title">
              {this.props.title}
            </div>
            <div className="hs-program-outcome-counts">
              <div className="count-all">
                <span className="count-all-number">{this.state.programCounts.all}</span> <span className="count-all-desc">program{this.state.programCounts.all !== 1 && "s"}</span>
              </div>
              <div className="outcome-counts-wrapper">
                <div className={`outcome-count ${this.state.programCounts.certain > 0 ? "count-certain" : "count-empty"}`}  >
                  <OutcomeCertainIcon color={OutcomeCertainColor} width={ICONSIZE} height={ICONSIZE}/>{this.state.programCounts.certain > 0 ? this.state.programCounts.certain : "·"}
                </div>
                <div className={`outcome-count ${this.state.programCounts.likely > 0 ? "count-likely" : "count-empty"}`}>
                  <OutcomeLikelyIcon color={OutcomeLikelyColor} width={ICONSIZE} height={ICONSIZE}/>{this.state.programCounts.likely > 0 ? this.state.programCounts.likely : "·"}
                </div>
                <div className={`outcome-count ${this.state.programCounts.uncertain > 0 ? "count-uncertain" : "count-empty"}`}>
                  <OutcomeUncertainIcon color={OutcomeUncertainColor} width={ICONSIZE} height={ICONSIZE}/>{this.state.programCounts.uncertain > 0 ? this.state.programCounts.uncertain : "·"}
                </div>
                <div className={`outcome-count  ${this.state.programCounts.unlikely > 0 ? "count-unlikely" : "count-empty"}`}>
                  <OutcomeUnlikelyIcon color={OutcomeUnlikelyColor} width={ICONSIZE} height={ICONSIZE}/>{this.state.programCounts.unlikely > 0 ? this.state.programCounts.unlikely : "·"}
                </div>
                <div className={`outcome-count ${this.state.programCounts.none > 0 ? "count-none" : "count-empty"}`}>
                  <OutcomeNoneIcon color={OutcomeNoneColor} width={ICONSIZE} height={ICONSIZE}/>{this.state.programCounts.none > 0 ? this.state.programCounts.none : "·"}
                </div>
                <div className={`outcome-count ${this.state.programCounts.notImplemented > 0 ? "count-notimplemented" : "count-empty"}`}>
                  <OutcomeNotImplementedIcon color={OutcomeNotImplementedColor} width={ICONSIZE} height={ICONSIZE}/>{this.state.programCounts.notImplemented > 0 ? this.state.programCounts.notImplemented : "·"}
                </div>
              </div>
            </div>
          </div>
          <button 
            className={`hs-category-collapse-button ${this.state.collapsed ? "collapsed" : ""}`}
            onClick={ ev => this.setState({collapsed: !this.state.collapsed}) }
          >
            <div className="hs-category-collapse-button-icon">
              {"<"}
            </div>
          </button>
        </div>
        <div className="hs-list">
          { 
            this.props.programs.sort( this.sortByOutcome ).map( (hs: HSProgram) => {
              return (
                <HSProgramElement 
                  key={hs.id} 
                  program={hs} 
                  selected={hs.id === this.props.selectedProgramID}
                  onSelect={ newID => this.props.onSelectedProgramIDChange(newID) }
                /> 
              );
            })
          }
      </div>
    </div>
    );
  }
};

export default HSGroup;
