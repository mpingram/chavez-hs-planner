import * as React from "react";
import * as Autosuggest from "react-autosuggest";
import { createSelector } from "reselect";

import { AppState, ProgramDictionary } from "shared/types";
import { store } from "shared/redux/store";

type Suggestions = Array<{
  title: "Programs" | "Program Types" | "Schools"
  suggestions: string[]
}>;

const getProgramDict = (state: AppState) => state.data.hsPrograms;

/* getSuggestions gets a list of search suggestions for highschool programs from 
 * a ProgramDictionary. The numSuggestions argument determines how many suggestions to return. */
const getSuggestions = (programDict: ProgramDictionary, query: string, numSuggestions = 10 ): Suggestions => {

  const isLeftSubstring = (query: string, str: string): boolean => {
    const leftSubstring = str.trim().toLowerCase().slice(0, query.length);
    if (leftSubstring === query.toLowerCase()){
      return true;
    } else {
      return false;
    }
  };

  // use hash maps to store matches without repeats.
  // (programTypes and schools are not unique to programs,
  // so we would have to check for duplicates otherwise).
  let programMatches = {};
  let programTypeMatches = {};
  let schoolMatches = {};

  // Iterate through ProgramDict until we have numSuggestions matches.
  // Object.some is used here to exit from the iteration early. We'll
  // return true once we've got ten matches, or we'll reach
  // the end of the array.
  Object.keys(programDict).some( programID => {
    const program = programDict[programID];

    if (isLeftSubstring(query, program.programName)) {
      programMatches[program.programName] = 1;
    } else if (isLeftSubstring(query, program.programType)) {
      programTypeMatches[program.programType] = 1;
    } else if (isLeftSubstring(query, program.schoolNameLong)) {
      schoolMatches[program.schoolNameLong] = 1;
    }

    // see how many matches we have; if we have enough, exit early.
    const numProgramMatches = Object.keys(programMatches).length;
    const numProgramTypeMatches = Object.keys(programTypeMatches).length;
    const numSchoolMatches = Object.keys(schoolMatches).length;
    if (numProgramMatches + numProgramTypeMatches + numSchoolMatches >= numSuggestions) {
      return true;
    } else {
      return false;
    }
  });

  // convert our hash maps of matches to a Suggestions object
  return [
    {
      title: "Programs",
      suggestions: Object.keys(programMatches)
    },
    {
      title: "Program Types",
      suggestions: Object.keys(programTypeMatches)
    },
    {
      title: "Schools",
      suggestions: Object.keys(schoolMatches)
    },
  ];
};



import SearchIcon from "shared/components/icons/search";

interface SearchBarProps {
  placeholder: string
  defaultValue: string
  onSearchSubmit: (searchTerm: string | null) => any
}

interface SearchBarState {
  query: string
  suggestions: Suggestions
}

export class SearchBar extends React.PureComponent<SearchBarProps, SearchBarState> {

  constructor(props) {
    super(props);
    this.state = {
      query: props.defaultValue,
      suggestions: []
    }
  }

  render() {
    return (
      <div 
        className="search-bar field has-addons"
        onKeyUp={ ev => ev.key === "Enter" && this.props.onSearchSubmit(this.state.query) }
      >
        <div className="control is-expanded">
          <Autosuggest
            inputProps={{
              className:"input",
              type:"search",
              placeholder:"Search for schools or programs...",
              value: this.state.query,
              onChange: this.handleQueryChange
            }}
            multiSection={true}
            suggestions={this.state.suggestions}
            renderSuggestion={this.renderSuggestion}
            renderSectionTitle={this.renderSectionTitle}
            getSectionSuggestions={ section => section.suggestions }
            getSuggestionValue={ suggestion => suggestion }
            onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
            onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          />
        </div>
        <div className="control">
          <button
            className="button"
            onClick={ ev => {
              this.props.onSearchSubmit(this.state.query);
            }}
          >
          <SearchIcon width="18px" height="18px"/>
          Search
        </button>
      </div>
    </div>
    );
  }

  /*
   * renderSuggestion returns the DOM of each suggestion in react-autosuggest element
   * */
  private renderSuggestion = (suggestion: string, {query, isHighlighted}): React.ReactNode => {
    // boldface the query part of each search suggestion
    return <div>
      <strong>{suggestion.slice(0, query.length)}</strong>
      {suggestion.slice(query.length)}
    </div>
  }
  private renderSectionTitle = (section): React.ReactNode => {
    return <h4>{section.title}</h4>
  }

  private handleSuggestionsFetchRequested = ({value}): void => {
    this.setState({
      suggestions: getSuggestions(getProgramDict(store.getState()), value)
    });
  }

  private handleSuggestionsClearRequested = (): void => {
    this.setState({
      suggestions: []
    });
  }

  private handleQueryChange = ev => {
    const nextQuery = ev.currentTarget.value;
    if (nextQuery === "") {
      this.props.onSearchSubmit(null);
    }
    this.setState({
      query: nextQuery,
    });
  }
}
