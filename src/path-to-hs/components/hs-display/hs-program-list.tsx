import * as React from "react";

import HSProgram from "shared/types/hs-program";
import SearchBar from "shared/components/ui/search-bar";

import HSGroup from "./hs-group";

interface HSProgramListProps {
  hsProgramsByType: {[type: string]: HSProgram[]}
  selectedProgramID: string
  onSelectedProgramIDChange: (id: string) => any
}

interface HSProgramListState {
  searchTerm: string;
}

import {INPUT_DEBOUNCE_TIME} from "shared/constants";

class HSProgramList extends React.PureComponent<HSProgramListProps, HSProgramListState> {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }

  private filterBySearchTerm = (programs: HSProgram[], searchTerm: string): HSProgram[] => {

    if (searchTerm.trim() === "") {
      return programs;
    }

    const term = searchTerm.trim().toLowerCase();
    const hasTerm = (text: string) => {
      return text.toLowerCase().indexOf(term) != -1;
    };

    return programs.filter( program => {
      return hasTerm(program.shortname) || hasTerm(program.programType);
    });
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          overflowX: "hidden",
          overflowY: "hidden"
        }}
      >
        <SearchBar 
          value={this.state.searchTerm} 
          onChange={value => this.setState({searchTerm: value})}
          debounceTime={INPUT_DEBOUNCE_TIME}
        />
        <div 
          style={{
            width: "100%", 
            height: "100%", 
            overflowY: "auto", 
            overflowX:"hidden", 
            position: "relative"
          }}
        >
          {
          Object.keys(this.props.hsProgramsByType).sort().map( programType => {
              const programs = this.props.hsProgramsByType[programType];
              const filteredPrograms = this.filterBySearchTerm(programs, this.state.searchTerm);
              if (filteredPrograms.length > 0 ) {
                return (<HSGroup 
                  key={programType}
                  title={programType}
                  programs={filteredPrograms}
                  selectedProgramID={this.props.selectedProgramID}
                  onSelectedProgramIDChange={ id => this.props.onSelectedProgramIDChange(id) }
                />)
              }
            })
          }
        </div>
      </div>
    );
  }
};

export default HSProgramList;
