import * as React from "react";

import OutcomeIconProps from "./outcome-icon-props";

const OutcomeUnlikelyIcon = (props: OutcomeIconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={props.color} width={props.width} height={props.height} viewBox="0 0 750 750">
      <rect y="350" x="125" height="75" width="500"/>
    </svg>
  );
}

export default OutcomeUnlikelyIcon;