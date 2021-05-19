import React, { useState } from "react"
import { SmallModalPropsType } from "./index.type"
import style from "../index.module.scss"
import moment from "moment"
import { ReducerType } from "../../../redux/reducer.type"
import {compose} from "recompose";
import {connect} from "react-redux";
import plannedActions from "../../../redux/planned/actions" 
import { getId, fixTimeFormat } from "../../../utilities"

const SmallModal = (props: SmallModalPropsType) => {
    const {date, setVisibleSmallModal, dispatch} = props
    const [getHours, setHours] = useState<string>(moment().format("HH"))
    const [getMinutes, setMinutes] = useState<string>(moment().format("mm"))
    const [getMessage, setMessage] = useState<string>() 
    const [getPrio, setPrio] = useState<string>("2")
    const generateBottomButtons = () => {
        return <div className={style.flexRowBet}>
            <div className={style.prioContainer}>
                <label htmlFor="prio">Prio</label>
                <select onChange={(e:any) => setPrio(e.target.value)} defaultValue="2" id="prio" name="prioList">
                    <option value="3">Wysokie</option>
                    <option value="2">Średnie</option>
                    <option value="1">Niskie</option>
                </select>
            </div>
            <div className={style.bottomContainer}>
                <button onClick={() => {
                    setVisibleSmallModal(false);
                    submitValues()
                }}>
                    Dodaj
                </button>
                <button onClick={() => setVisibleSmallModal(false)}>
                    Zamknij
                </button>
            </div>
        </div>
    }
 
    const submitValues = () => {
        dispatch({
            type: plannedActions.SET_PLANNER,
            payload: {
                date,
                planned: [{
                    time: `${fixTimeFormat(getHours)}:${fixTimeFormat(getMinutes)}`,
                    message: getMessage,
                    prio: getPrio,
                    id: getId(),
                    done: false
                }]
            }
        })
    }

    const validateHours = (e:any) => {
        const value = e.target.value;
        if (value >= 0 && value <= 23 && value.length <= 2) setHours(value)
    }

    const validateMinutes = (e:any) => {
        const value = e.target.value;
        if (value >= 0 && value <= 59 && value.length <= 2) setMinutes(value)
    }

    return <>
        <div className={style.backgroundSmallModal} />
        <div className={style.smallModalContainer}>
            <h2 className={style.title}>{date}</h2>
            <hr />
            <div className={style.hourContainer}>
                <input maxLength={2} type={'number'} value={getHours} onChange={(e:any) => validateHours(e)} className={style.input}></input>
                :
                <input maxLength={2} type={'number'} value={getMinutes} onChange={(e:any) => validateMinutes(e)} className={style.input}></input>
            </div>
            <textarea placeholder={"Opis"} onChange={(e:any) => setMessage(e.target.value)} className={style.textArea}/>
            <hr />
            {generateBottomButtons()}
        </div>
    </>
}

const mapStateToProps = (state: ReducerType) => {
    return {}
}

export default compose<SmallModalPropsType, any>(
    connect(mapStateToProps),
)(SmallModal)