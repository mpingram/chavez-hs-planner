import * as React from "react";
import { connect } from "react-redux";
import { List, Map } from "immutable";
import { createSelector } from "reselect";

import AppState from "shared/types/app-state";
import Program from "shared/types/program";
import SuccessChance from "shared/enums/success-chance";

import HSProgramList from "./hs-program-list";

import { selectHSProgram } from "shared/actions";


const mapStateToProps = (state: AppState) => {
  return {
    programs: state.getIn(['hsData', 'hsPrograms']),
    outcomes: state.getIn(['hsData', 'programOutcomes']),
    groups: state.getIn(['hsData', 'hsGroups']),
    selectedProgramID: state.get('selectedHSProgramID')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectedProgramIDChange: (newID: string) => dispatch(selectHSProgram(newID))
  }
};

const HSProgramsContainer = connect(mapStateToProps, mapDispatchToProps)(HSProgramList);

export default HSProgramsContainer;


