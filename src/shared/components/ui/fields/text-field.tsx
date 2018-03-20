import * as React from "react";
import FieldValidationState from "./field-validation-state";
import FieldContainer from "./field-container";
import Limiter from "./limiter";

// TODO remove dependency
import debounce from "shared/util/debounce";

interface TextFieldProps {

  // base
  onChange: (newValue: string) => any
  value: string 
  editable?: boolean

  // extensions
  validator?: (nextValue: string) => FieldValidationState
  limiter?: Limiter<string>

  label?: string
  placeholder?: string

  debounceTime?: number

  // styling
  className?: string
  style?: Object
}

interface TextFieldState {
  localValue: string
}

class TextField extends React.PureComponent<TextFieldProps, TextFieldState> {

  constructor(props) {
    super(props);
    this.state = {
      localValue: props.value ? props.value : "",
    }
    this.onChange = props.debounceTime ? debounce(props.onChange, props.debounceTime) : props.onChange
  }

  private onChange: Function;

  componentWillReceiveProps(nextProps) {
    this.setState({localValue: nextProps.value ? nextProps.value : ""});
    this.onChange = nextProps.debounceTime ? debounce(nextProps.onChange, nextProps.debounceTime) : nextProps.onChange
  }

  render() {
    const notEditable = this.props.editable === false;

    const validation = this.props.validator ? this.props.validator(this.state.localValue) 
                                       : FieldValidationState.NEUTRAL;

    const handleChange = (ev) : boolean => {
      // if this is not an editable field, do nothing
      if (notEditable) {
        return false;
      }

      // special case: if input is blank, show
      // blank input but do not pass value up to parent
      if (ev.currentTarget.value === "") {
        this.setState({localValue: ""});
        return false;

      } else {
        const currValue = this.props.value;
        const nextValue = ev.currentTarget.value;
        this.setState({localValue: nextValue});
        if (this.props.limiter) {
          this.onChange(this.props.limiter(currValue, nextValue));
        } else {
          this.onChange(nextValue);
        }
        return true;
      }
    };

    const inputClassName = "field-input-element " + (this.props.editable === false ? "no-edit" : "");

    return (
      <FieldContainer style={this.props.style} className={this.props.className} label={this.props.label} validation={validation}>
        <input readOnly={notEditable} value={this.state.localValue} type="text" className={inputClassName} onChange={handleChange}/>
      </FieldContainer>
    );
  }
}

export default TextField;
