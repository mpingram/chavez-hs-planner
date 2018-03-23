import * as React from "react";

import SearchIcon from "shared/components/icons/search";
import debounce from "shared/util/debounce";

import "./search-bar.scss";

interface SearchBarProps {
  value: string
  onChange: (newVal: string) => any;
  debounceTime?: number
}

interface SearchBarState {
  localValue: string
}

class SearchBar extends React.PureComponent<SearchBarProps, SearchBarState> {

  constructor(props) {
    super(props);
    this.state = {
      localValue: props.value
    };
    const handleChange = value => props.onChange(value);
    if (props.debounceTime) {
      this.handleChange = debounce(handleChange, props.debounceTime) as (newVal: string) => any;
    } else {
      this.handleChange = handleChange;
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.value);
    this.setState({
      localValue: nextProps.value
    });
  }

  private handleChange: (newVal: string) => any;

  render() {
    return (
      <div className="search-bar-container">
        <div className="search-bar">
          <SearchIcon width="24px" height="24px"/>
          <input 
            className="search-bar-input"
            type="text" 
            value={this.state.localValue ? this.state.localValue : " "} 
            onChange={ ev => {
              const value = ev.currentTarget.value;
              this.setState({localValue: value});
              this.handleChange(value);
            } } 
          />
        </div>
      </div>
    );
  };
};

export default SearchBar;
