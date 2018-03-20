import * as React from "react";

import "./main.scss";

import FieldLabel from "./field-label";
import FieldValidationState from "./field-validation-state";

interface FieldContainerProps {
  className?: string
  children?: any
  label?: string
  validation?: FieldValidationState;
  style?: Object
}

const FieldContainer = (props: FieldContainerProps) => (
  <div style={props.style} className={"field-container" + " " + props.className}>
    {
    props.label &&
    <FieldLabel>
      {props.label}
    </FieldLabel>
    }
    {props.children}
  </div>
);

export default FieldContainer;
