import * as React from "react";

/* 
 * Higher-order component that adds input debouncing to a component.
 * */

interface WithDebounceOptions {
  valuePropName: string
  onChangePropName: string
  debounceTime: number
}

export const withDebounce = (InnerComponent, options: WithDebounceOptions) => {

  return class extends React.Component<any, {cachedValue: any}> {

    constructor(props) {
      super(props);
      this.state = {
        cachedValue: props[options.valuePropName]
      };
    }

    render() {

      this.overriddenProps[options.valuePropName] = this.state.cachedValue;
      this.overriddenProps[options.onChangePropName] = this.handleInnerOnChange;

      return (
        <InnerComponent 
          {...this.props}
          {...this.overriddenProps}
        />
      );
    }

    private overriddenProps = {};

    private handleInnerOnChange = (newValue) => {
      this.setState({
        cachedValue: newValue
      });
      setTimeout( () => {
        this.props[options.onChangePropName](newValue);
      }, options.debounceTime);
    }
  }
};
