import * as React from "react";

import OutcomeIconProps from "./outcome-icon-props";
import { OutcomeCertainColor } from "shared/constants";

const OutcomeCertainIcon = (props: OutcomeIconProps) => {
  return (
    <svg 
      stroke="black"
      strokeWidth="0.5"
      fill={props.color ? props.color : OutcomeCertainColor} 
      height={props.height} 
      viewBox="0 0 24 24" 
      width={props.width} 
      xmlns="http://www.w3.org/2000/svg">
        <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/>
    </svg>
  );
};

export default OutcomeCertainIcon;
