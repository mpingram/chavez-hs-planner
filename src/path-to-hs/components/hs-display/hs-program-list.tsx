import * as React from "react";

import Program from "shared/types/program";
import ProgramGroup from "shared/types/program-group";

import SearchBar from "shared/components/ui/search-bar";

import HSGroup from "./hs-group";

interface HSProgramListProps {
  programs: Program[]
  groups: ProgramGroup[]
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


  private filterBySearchTerm = (programs: Program[], searchTerm: string): Program[] => {

    if (searchTerm.trim() === "") {
      return programs;
    }

    const term = searchTerm.trim().toLowerCase();
    const hasTerm = (text: string) => {
      return text.toLowerCase().indexOf(term) != -1;
    };

    return programs.filter( program => {
      return hasTerm(program.programName);
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
          this.props.groups.map( group => {
            const programs = group.programIDs.map( programID => this.props.programs[programID] );
            const filteredPrograms = this.filterBySearchTerm(programs, this.state.searchTerm);
            if (filteredPrograms.length > 0) {
              return (
                <div
                  key={group.groupName}
                >
                </div>
              )
            }
          })
          }
        </div>
      </div>
    );
  }
};

export default HSProgramList;
