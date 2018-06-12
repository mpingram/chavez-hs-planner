import * as React from "react";

import OutcomeIconProps from "./outcome-icon-props";
import { OutcomeCertainColor } from "shared/constants";

const OutcomeCertainIcon = (props: OutcomeIconProps) => {
  return (
  <svg
     xmlns="http://www.w3.org/2000/svg"
     width={props.size}
     height={props.size}
     viewBox="0 0 100 100"
     version="1.1"
  >
    <path
      fill="none"
      fillRule="evenodd"
      stroke="#000000"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="miter"
      strokeMiterlimit="4"
      strokeDasharray="none"
      strokeOpacity="1"
      d="M 75,25 30.604203,78.502627 19.608671,49.970028"
    />
    <circle
      opacity="1"
      fill="#eee"
      fillOpacity="1"
      stroke="none"
      strokeWidth="0.97720796"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeMiterlimit="1"
      strokeDasharray="none"
      strokeDashoffset="0"
      strokeOpacity="1"
      cx="50"
      cy="1002.3622"
      r="48.511395" 
    />
  </svg> 
  );
};

export default OutcomeCertainIcon;
