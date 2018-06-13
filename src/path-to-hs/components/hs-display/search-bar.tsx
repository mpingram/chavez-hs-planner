import * as React from "react";

import SearchIcon from "shared/components/icons/search";

interface SearchBarProps {
  placeholder: string
  defaultValue: string
  onSearchSubmit: (searchTerm: string | null) => any
}

interface SearchBarState {
  value: string
}

export class SearchBar extends React.PureComponent<SearchBarProps, SearchBarState> {

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    }
  }

  render() {
    return (
      <div className="search-bar field has-addons">
        <div className="control is-expanded">
          <input 
            className="input"
            type="search" 
            placeholder="Search for schools or programs..."
            value={this.state.value} 
            onChange={this.handleChange}
        />
        </div>
        <div className="control">
          <button
            className="button"
            onClick={ ev => {
              this.props.onSearchSubmit(this.state.value);
            }}
          >
          <SearchIcon width="18px" height="18px"/>
          Search
        </button>
      </div>
    </div>
    );
  }

  private handleChange = ev => {
    if (ev.currentTarget.value === "") {
      this.props.onSearchSubmit(null);
    }
    this.setState({value: ev.currentTarget.value});
  }
}
