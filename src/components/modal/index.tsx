import React, { useEffect, useState } from "react"
import { PlannedType, SingleEventPlanned } from "../../redux/planned/planned.type"
import style from "./index.module.scss"
import {ModalPropsType} from "./index.type" 
import SmallModal from "./smallModal"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBed, faTrash} from "@fortawesome/free-solid-svg-icons"
import actions from "../../redux/planned/actions" 
import {compose} from "recompose"
import {connect} from "react-redux"
import { ReducerType } from "../../redux/reducer.type"

const Modal = (props:ModalPropsType) => {
    const {setModalVisible, getModalDetails, getClickedDay, dispatch, planned} = props

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
    const setDayOff = (date: string, dayOff:boolean) => {
        dispatch({
            type: actions.SET_DAYOFF,
            payload: {
                date,
                dayOff
            }
        })
    }
    const generatePlannedEvents = () => {
        const generateSingleEvent = (item:SingleEventPlanned[]) => {
            return item.map((el:SingleEventPlanned) => {
                const {time, message, id} = el 
                return <li key={id}>
                    <div className={style.timeContainer}> 
                        <p >{time && time} </p>
                        <FontAwesomeIcon 
                            className={style.icon}
                            icon={faTrash}
                            onClick={() => deleteEvent(id)}
                        />
                    </div>
                    <p className={style.message}>{message && message}</p>
                </li>
            })
        }
        if (getPlanned && getPlanned?.planned?.length > 0) {
            return <ul className={style.eventContainer}>
                {generateSingleEvent(getPlanned.planned)}
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
            <input type={"color"} onChange={(e:any) => setColor(e)}/>
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
                color: e.target.value
            }
        })
    }, 500);
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

