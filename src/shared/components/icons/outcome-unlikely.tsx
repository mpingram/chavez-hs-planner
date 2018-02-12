import * as React from "react";

import OutcomeIconProps from "./outcome-icon-props";

const OutcomeUnlikelyIcon = (props: OutcomeIconProps) => {
  return (
    <svg fill={props.color} height={props.height} viewBox="0 0 24 24" width={props.width} xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
    </svg>
  );
}

export default OutcomeUnlikelyIcon;
