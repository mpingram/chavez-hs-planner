import * as React from "react";

import {
  Program,
  ProgramOutcome,
  ProgramDictionary,
  ProgramGroup,
  ProgramOutcomeDictionary
} from "shared/types";
import { SuccessChance } from "shared/enums";

import { SearchBar } from "./search-bar";

import SuccessChanceFilter from "./success-chance-filter";
import HSGroup from "./hs-group";

interface HSProgramListProps {
  programs: ProgramDictionary
  programGroups: ProgramGroup[]
  outcomes: ProgramOutcomeDictionary
  onSelectedProgramChange: (program: Program, outcome: ProgramOutcome | undefined) => any
}

interface HSProgramListState {
  searchTerm: string | null;
  selectedSuccessChance: SuccessChance | null
}

import "./hs-program-list.scss";

class HSProgramList extends React.PureComponent<HSProgramListProps, HSProgramListState> {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: null,
      selectedSuccessChance: null
    };
  }


  render() {
    return (
      <div
        className="hs-program-list-container"
      >
        <div className="hs-program-list-header">
          <SuccessChanceFilter
            selectedSuccessChance={this.state.selectedSuccessChance}
            onSelectedSuccessChanceChange={ succChance => this.setState({selectedSuccessChance: succChance}) }
          />

          <SearchBar 
            placeholder="Search for schools or programs..."
            defaultValue={this.state.searchTerm ? this.state.searchTerm : ""}
            onSearchSubmit={this.handleSearchSubmit}
          />
        </div>

        <div className="hs-program-list">
          {
          /* 
           * Iterate through the hsProgramGroups passed in through props.
           * For each program group, render a HSGroup component containing the programs
           * with the ids specified in the program group.
           * */
          this.props.programGroups.map( group => {
            // get this group's programs by looking up programIDs.
            const programs: Program[] = group.programIDs.map( programID => this.props.programs[programID] );
            // filter the programs by the current search term and by the current filters on SuccessChance.
            let filteredPrograms = programs;
            if (this.state.searchTerm !== null) {
              filteredPrograms = this.filterBySearchTerm(filteredPrograms, this.state.searchTerm);
            }
            if (this.state.selectedSuccessChance !== null) {
              filteredPrograms = this.filterBySuccessChance(filteredPrograms, this.props.outcomes, this.state.selectedSuccessChance);
            }

            if (filteredPrograms.length > 0) {
              return (
                <HSGroup
                  key={group.id}
                  title={group.name}
                  programs={filteredPrograms}
                  outcomes={this.props.outcomes}
                  onSelectedProgramChange={this.props.onSelectedProgramChange}
                />
              )
            }
          })
          }
        </div>
      </div>
    );
  }

  private filterBySearchTerm = (programs: Program[], searchTerm: string): Program[] => {
    // if search term is empty, return early.
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

  /** 
   * Keep only the programs whose current outcome's overall chance matches the successChance passed as the third argument.
   * */
  private filterBySuccessChance = (programs: Program[], outcomes: ProgramOutcomeDictionary, successChance: SuccessChance): Program[] => {
    return programs.filter( program => {
      const outcome = outcomes[program.id];
      if (outcome === undefined) {
        console.warn(`Missing outcome for program ${program.programName}`);
        return true;
      }
      return successChance === outcome.overallChance;
    });
  }

  private handleSearchSubmit = (newSearchTerm: string | null) => {
    /* if search term was not cleared, unset any selected success chance filters */
    if (newSearchTerm !== null) {
      this.setState({
        searchTerm: newSearchTerm,
        selectedSuccessChance: null
      });
    } else {
      this.setState({searchTerm: null});
    }
  }

};

export default HSProgramList;
