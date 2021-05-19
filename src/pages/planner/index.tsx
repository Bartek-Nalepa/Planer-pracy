import React, { useEffect, useState } from 'react';
import {compose} from "recompose";
import {connect} from "react-redux";
import actions from "../../redux/planned/actions"
import {ReducerType} from "../../redux/reducer.type"
import { PlannerPropsType } from "./planner.type"
import style from "./index.module.scss"
import moment from "moment"
import Swiper from "../../components/swiper"
import {momentFormat} from "../../config/ENV_CON"

function Planned(props:PlannerPropsType) {
  const {dispatch, planned} = props

  const [getCurrentDay, setCurrentDay] = useState<string>(moment().format(momentFormat))

  useEffect(() => {console.log(props, "props", planned, "planned" )}, [planned])
  // localStorage.removeItem("planned")

  return(
    <div className={style.container}>
        <Swiper 
          getCurrentDay={getCurrentDay} 
          setCurrentDay={setCurrentDay}
        />
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