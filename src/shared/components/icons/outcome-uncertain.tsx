import * as React from "react";

import OutcomeIconProps from "./outcome-icon-props";

const OutcomeUncertainIcon = (props: OutcomeIconProps) => {
  return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill={props.color}
    viewBox="-0.5 -0.303 427 427">
    <path d="M 129.9,189.5 C 103.9,189.5 88.7,205.42 63.5,238.06 L 33.1,217.1 C 47.9,195.5 57.9,182.62 75.5,169.18 C 91.427778,157.15296 111.9,145.02 135.101,145.02 C 172.276,145.02 192.278,161.973 223.101,185.82 C 253.501,209.34 274.702,219.421 293.901,219.421 C 302.301,219.421 317.28256,215.01581 327.102,207.101 C 340.22141,197.96521 349.502,185.981 363.502,163.42 L 394.302,187.26 C 377.902,212.22 367.102,224.3 353.902,235.82 C 333.502,254.06 314.702,264.381 288.702,264.381 C 218.652,264.38 187.714,189.5 129.9,189.5 z " />
  </svg>
  );
}

export default OutcomeUncertainIcon;
