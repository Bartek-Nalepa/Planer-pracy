import React, { useEffect, useState } from "react"
import { PlannedType, SingleEventPlanned } from "../../redux/planned/planned.type"
import style from "./index.module.scss"
import {ModalPropsType} from "./index.type" 
import SmallModal from "./smallModal"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCheck, faTrash} from "@fortawesome/free-solid-svg-icons"
import actions from "../../redux/planned/actions" 
import {compose} from "recompose"
import {connect} from "react-redux"
import { ReducerType } from "../../redux/reducer.type"
import { findInArray2x } from "../../utilities"

const Modal = (props:ModalPropsType) => {
    const {setModalVisible, getClickedDay, dispatch, planned} = props

    const [getVisibleSmallModal, setVisibleSmallModal] = useState<boolean>(false)
    const [getPlanned,setPlanned] = useState<PlannedType>()

    useEffect(() => {
        setPlanned(planned.find((item: any) => {
            return item.date === getClickedDay
        }))
    }, [planned])

    const disableModal = () => setModalVisible(false)
    const deleteEvent = (id: number) => dispatch({
        type: actions.REMOVE_PLANNER,
        payload: id
    })
    const setDayOff = (date: string, dayOff: boolean) => {
        dispatch({
            type: actions.SET_DAYOFF,
            payload: {
                date,
                dayOff
            }
        })
    }
    const setAsDone = (id: number) => dispatch({
        type: actions.SET_DONE,
        payload: {
            id
        }
    })
    const generatePlannedEvents = () => {
        const generateEvents = (item:SingleEventPlanned[], priority: string) => {
            const switchCase = (prio:string) => {switch (prio){case '1':return <h3>Niskie prio</h3>; case '2':return <h3>Średnie prio</h3>; case '3':return <h3>Wysokie prio</h3>}}
            return <>
                {switchCase(priority)} 
            {
                item.map((el:SingleEventPlanned) => {
                    // console.log(el, "el", priority)
                    const {time, message, id, done, prio} = el 
                    return !done && priority === prio && <li key={id}>
                        <div className={style.timeContainer}> 
                            <p >{time && time} </p>
                            <div>
                                <FontAwesomeIcon 
                                    className={style.icon}
                                    icon={faCheck}
                                    onClick={() => setAsDone(id)}
                                />
                                <FontAwesomeIcon 
                                    className={style.icon}
                                    icon={faTrash}
                                    onClick={() => deleteEvent(id)}
                                />
                            </div>                        
                        </div>
                        <p className={style.message}>{message && message}</p>
                    </li>
                })
            }
            </>
        }
        if (getPlanned && getPlanned?.planned?.length > 0 && getPlanned?.planned?.find((el:SingleEventPlanned) => !el.done)) {
            return <ul className={style.eventContainer}>
                {
                  console.log(findInArray2x(getPlanned.planned, "prio", "3" , "done", false))
                }
                {findInArray2x(getPlanned.planned, "prio", "3", "done", false) && generateEvents(getPlanned.planned, '3')}
                {findInArray2x(getPlanned.planned, "prio", "2", "done", false) && generateEvents(getPlanned.planned, '2')}
                {findInArray2x(getPlanned.planned, "prio", "1", "done", false) && generateEvents(getPlanned.planned, '1')}
            </ul>
        } else {
            return <div className={style.noEvents}>
                <p>Brak zaplanowanych wydarzeń</p>
            </div>
        }
    }
    const generateBottomButtons = () => {
        return <div className={style.flexRowBet}>
            <button 
                style={{marginLeft: "8px"}} 
                className={getPlanned?.dayOff ? style.buttonFilled : style.btn}
                onClick={() => setDayOff(getClickedDay, !getPlanned?.dayOff )}>
                {getPlanned?.dayOff ? 'Usuń wolny dzień' : "Ustaw wolny dzień" }
            </button>
            <input style={{cursor: "pointer"}} type={"color"} onChange={(e:any) => setColor(e)}/>
            <div className={style.bottomContainer}>
                <button onClick={() => setVisibleSmallModal(true)}>
                    Dodaj
                </button>
                <button onClick={disableModal}>
                    Zamknij
                </button>
            </div>
        </div>
    }
    let timer: any
    const setColor = (e:any) => {
       clearTimeout(timer)
       timer = setTimeout(() => {
       dispatch({
            type:actions.SET_COLOR,
            payload: {
                date: getClickedDay,
                color: e.target.value
            }
        })
    }, 250);
    }
    return (
        <>
            {
                getVisibleSmallModal && 
                <SmallModal
                    date={getClickedDay} 
                    setVisibleSmallModal={setVisibleSmallModal}
                />
            }
            <div onClick={() => disableModal()} className={style.backgroundModal} />
            <div className={style.modalContainer}>
                <h2 className={style.title}>{getClickedDay}</h2>
                <hr />
                {generatePlannedEvents()} 
                <hr />
                {generateBottomButtons()}
            </div>
        </>
    )
}

const mapStateToProps = (state: ReducerType) => ({
    planned: state.planned
})

export default compose<ModalPropsType,any>(
    connect(mapStateToProps),
)(Modal);

