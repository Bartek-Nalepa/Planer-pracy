import React, { useEffect } from 'react';
import {compose} from "recompose";
import {connect} from "react-redux";
import actions from "../../redux/planned/actions"
import {ReducerType} from "../../redux/reducer.type"
import { PlannerPropsType } from "./planner.type"

function Planned(props:PlannerPropsType) {
  const {dispatch} = props

  return(
    <div>
        Main
    </div>
    )
}

const mapStateToProps = (state: ReducerType) => {
  return {
    planned: state.planned
  }
}

export default compose<PlannerPropsType,any>(
  connect(mapStateToProps),
)(Planned)