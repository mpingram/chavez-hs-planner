import * as React from "react";

interface IconProps {
  width: string
  height: string
  color?: string
}

const HorizontalMoreIcon: React.SFC<IconProps> = (props) => {
  return (
    <svg 
      width={props.width} 
      height={props.height} 
      fill={props.color} 
      xmlns="http://www.w3.org/2000/svg" 
      x="0px" 
      y="0px"
      viewBox="0 0 24 24"
    >
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
  );
}

export default HorizontalMoreIcon;
