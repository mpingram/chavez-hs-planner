import * as React from "react";

import {
  Program,
  ProgramOutcome,
  ProgramDictionary,
  ProgramGroup,
  ProgramOutcomeDictionary
} from "shared/types";
import { SuccessChance } from "shared/enums";

import SearchBar from "shared/components/ui/search-bar";


import SuccessChanceFilter from "./success-chance-filter";
import HSGroup from "./hs-group";

interface HSProgramListProps {
  programs: ProgramDictionary
  programGroups: ProgramGroup[]
  outcomes: ProgramOutcomeDictionary
  onSelectedProgramChange: (program: Program, outcome: ProgramOutcome | undefined) => any
}

interface HSProgramListState {
  searchTerm: string;
  selectedSuccessChance: SuccessChance | null
}

import {INPUT_DEBOUNCE_TIME} from "shared/constants";

class HSProgramList extends React.PureComponent<HSProgramListProps, HSProgramListState> {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      selectedSuccessChance: null
    };
  }


  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          overflowX: "hidden",
          overflowY: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "stretch"
        }}
      >
        <SuccessChanceFilter
          succCertainActive={this.state.selectedSuccessChance === null || this.state.selectedSuccessChance === SuccessChance.CERTAIN}
          succLikelyActive={this.state.selectedSuccessChance === null || this.state.selectedSuccessChance === SuccessChance.LIKELY}
          succUncertainActive={this.state.selectedSuccessChance === null || this.state.selectedSuccessChance === SuccessChance.UNCERTAIN}
          succUnlikelyActive={this.state.selectedSuccessChance === null || this.state.selectedSuccessChance === SuccessChance.UNLIKELY}
          succNoneActive={this.state.selectedSuccessChance === null || this.state.selectedSuccessChance === SuccessChance.NONE}
          succNotImplementedActive={this.state.selectedSuccessChance === null || this.state.selectedSuccessChance === SuccessChance.NOTIMPLEMENTED}

          onSuccCertainClick={ ev => this.setState({selectedSuccessChance: SuccessChance.CERTAIN}) }
          onSuccLikelyClick={ ev => this.setState({selectedSuccessChance: SuccessChance.LIKELY}) }
          onSuccUncertainClick={ ev => this.setState({selectedSuccessChance: SuccessChance.UNCERTAIN}) }
          onSuccUnlikelyClick={ ev => this.setState({selectedSuccessChance: SuccessChance.UNLIKELY}) }
          onSuccNoneClick={ ev => this.setState({selectedSuccessChance: SuccessChance.NONE}) }
          onSuccNotImplementedClick={ ev => this.setState({selectedSuccessChance: SuccessChance.NOTIMPLEMENTED}) }
        />

        <SearchBar 
          value={this.state.searchTerm} 
          onChange={value => this.setState({searchTerm: value})}
          debounceTime={INPUT_DEBOUNCE_TIME}
        />
        <div 
          style={{
            width: "100%", 
            flex: "1 1 80vh",
            overflowY: "auto", 
            overflowX:"hidden", 
            position: "relative"
          }}
        >
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
            filteredPrograms = this.filterBySearchTerm(filteredPrograms, this.state.searchTerm);
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

};

export default HSProgramList;
