import * as React from "react";

import { AppState } from "shared/types";
import { connect, mapStateToProps } from "react-redux";

import { ProgramModal } from "./program-modal";

const mapStateToProps = (state: AppState) => {
  return {
    visible: state.programModalState.open,
    program: state.programModalState.program,
    outcome: state.programModalState.outcome
  }
}

export const ProgramModalContainer = connect(mapStateToProps)(ProgramModal);
