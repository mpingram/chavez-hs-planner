import * as React from "react";
import { store } from "shared/redux/store";
import { closeProgramModal } from "shared/redux/actions";

import Box from "shared/components/layout/box";
import StudentDataForm from "./components/student-info-display/student-data-form";
import SuccessChanceKey from "./components/hs-display/success-chance-key";
import HSProgramsContainer from "./components/hs-display/hs-programs-container";

import { ProgramModalContainer } from "./components/program-modal-container";

import "./path-to-hs.scss";
const PathToHS: React.SFC<any> = (props) => {
  return (
    <div 
      className='page'
      onKeyUp={ ev => { 
        if (ev.key === 'Escape') { 
          store.dispatch(closeProgramModal()) 
        }
      } }
    >
      <Box 
        width="half" 
        height="full" 
        flex={{
          flexDirection: "column", 
            justifyContent: "center",
            alignItems: "center"}}
          responsiveBehavior={{mobile: "fullscreen"}}
        >
          <StudentDataForm/>
        </Box>
        <Box 
          width="half" 
          height="full" 
          responsiveBehavior={{mobile: "fullscreen"}}
        >
          <HSProgramsContainer/>
        </Box>
        <ProgramModalContainer />
    </div>
  );
};

export default PathToHS;
