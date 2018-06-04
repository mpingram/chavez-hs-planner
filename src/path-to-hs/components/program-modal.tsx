import * as React from "react";

import { Program, ProgramOutcome } from "shared/types";

export interface ProgramModalProps {
  visible: boolean
  program: Program | null
  outcome: ProgramOutcome | null
}

export const ProgramModal: React.SFC<ProgramModalProps> = (props) => {
  return (
    <div style={{
        visibility: (props.visible ? 'visible' : 'hidden'), 
        position: 'absolute',
        backgroundColor: 'yellow',
        top: '50%',
        right: '50%', 
        fontSize: '300%',
        width: '40vw', 
        height: '40vh', 
        zIndex: 4
      }}
    > 
      {props.program ? props.program.programName : 'No program'}
    </div>
  )
};
