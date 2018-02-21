import * as React from "react";

import OutcomeIconProps from "./outcome-icon-props";
import { OutcomeLikelyColor } from "shared/constants";

const OutcomeLikelyIcon = (props: OutcomeIconProps) => {
  return (
    <svg 
      fill={props.color ? props.color : OutcomeLikelyColor} 
      height={props.height} 
      viewBox="0 0 24 24" 
      width={props.width} 
      stroke="black"
      strokeWidth="0.5"
      xmlns="http://www.w3.org/2000/svg">
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
    </svg>
  );
}

export default OutcomeLikelyIcon;
