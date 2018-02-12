import * as React from "react";

import HSProgram from "shared/types/hs-program";

import HSProgramElement from "./hs-program-element";

import "./hs-group.scss";

interface HSGroupProps {
  title: string
  programs: HSProgram[]
  selectedProgramID: string
  onSelectedProgramIDChange: (newID: string) => any
}

interface HSGroupState {
  collapsed: boolean
}

class HSGroup extends React.PureComponent<HSGroupProps, HSGroupState> {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    }
  }

  render() {
    return (
      <div className={`hs-category-container ${this.state.collapsed ? "collapsed" : ""}`}>
        <div className="hs-category-header">
          <div className="hs-category-title">
            {this.props.title}
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
            this.props.programs.map( (hs: HSProgram) => {
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
