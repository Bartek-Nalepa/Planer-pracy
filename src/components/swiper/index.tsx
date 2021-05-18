import React, { useEffect, useState } from "react"
import moment from "moment"
import {compose} from "recompose";
import style from "./index.module.scss"
import {connect} from "react-redux"
import { SwiperPropsType } from "./index.type"
import { momentFormat } from "../../config/ENV_CON"
import Modal from "../modal"
import { PlannedType } from "../../redux/planned/planned.type"
import { ReducerType } from "../../redux/reducer.type"

function Swiper(props: SwiperPropsType) {

    const {getCurrentDay, setCurrentDay, planned} = props
    const [getModalVisible, setModalVisible] = useState<boolean>(false)
    const [getModalDetails, setModalDetails] = useState<PlannedType>()
    const [getClickedDay, setClickedDay] = useState<string>('')
    const [getDays, setDays] = useState<any>()

    useEffect(() => {
        generateDays()
    }, [])

    const setDetails = (e:any) => {
        const day: string = e.currentTarget.getAttribute("day")
        setClickedDay(day)
        setModalDetails(
            planned.find((item: PlannedType) => {
                return item.date === day
            })
        )
        setModalVisible(true)
    }

    function swipeLeft(){ // CLICK RIGHT
        const container = document.getElementById("sliderContainer")

        const leftVoid = document.getElementById("leftVoid")
        const left = document.getElementById("left")
        const center = document.getElementById("center")
        const right = document.getElementById("right")
        const rightVoid = document.getElementById("rightVoid")
        setCurrentDay(moment(getCurrentDay, momentFormat).add(1, 'days').format(momentFormat))
    
        leftVoid?.remove()
        left?.classList.add("leftVoidImage")
        left?.classList.remove("leftImage")
        left?.setAttribute("id","leftVoid")
    
        center?.classList.add("leftImage")
        center?.classList.remove("centerImage")
        center?.setAttribute("id","left")
    
        right?.classList.add("centerImage");
        right?.classList.remove("rightImage")
        right?.setAttribute("id","center")
    
        rightVoid?.classList.add("rightImage");
        rightVoid?.classList.remove("rightVoidImage")
        rightVoid?.setAttribute("id","right")
        let div = document.createElement("div")
        div.id = "rightVoid"
        div.className = "rightVoidImage"
        div.setAttribute("day", `${moment(getCurrentDay, momentFormat).add(3,"days").format(momentFormat)}`)
        container?.appendChild(div)
        div.onclick = (e:any) => setDetails(e)
    }

    function swipeRight(){ // CLICK LEFT
        const container = document.getElementById("sliderContainer")
        const leftVoid = document.getElementById("leftVoid")
        const left = document.getElementById("left")
        const center = document.getElementById("center")
        const right = document.getElementById("right")
        const rightVoid = document.getElementById("rightVoid")

        setCurrentDay(moment(getCurrentDay, momentFormat).subtract(1, 'days').format(momentFormat))
        rightVoid?.remove()
        
        leftVoid?.classList.add("leftImage");
        leftVoid?.classList.remove("leftVoidImage")
        leftVoid?.setAttribute("id","left")

        left?.classList.add("centerImage")
        left?.classList.remove("leftImage")
        left?.setAttribute("id","center")

        center?.classList.add("rightImage")
        center?.classList.remove("centerImage")
        center?.setAttribute("id","right")

        right?.classList.add("rightVoidImage");
        right?.classList.remove("rightImage")
        right?.setAttribute("id","rightVoid")

        let div = document.createElement("div")
        div.id = "leftVoid"
        div.className = "leftVoidImage"
        div.setAttribute("day", `${moment(getCurrentDay, momentFormat).subtract(3,"days").format(momentFormat)}`)
        div.onclick = (e:any) => setDetails(e)
        container?.appendChild(div)
    }

    function countDays(){
        const initDay:string = moment(getCurrentDay, momentFormat).subtract(2, "days").format(momentFormat)
        const daysToGenerate: string[] = []
        for (let i:number = 0; i < 5; i++){
            daysToGenerate.push(moment(initDay, momentFormat).add(i, "days").format(momentFormat))
        }
        return daysToGenerate;
    }

    function generateDays(){
        const id = (index:number) => {
            switch (index) {
                case 0:
                    return "leftVoid"
                case 1:
                    return "left"
                case 2:
                    return "center"
                case 3:
                    return "right"
                case 4:
                    return "rightVoid"
            }
        }
        const classNames = (index:number) => {
            switch (index) {
                case 0:
                    return "leftVoidImage"
                case 1:
                    return "leftImage"
                case 2:
                    return "centerImage"
                case 3:
                    return "rightImage"
                case 4:
                    return "rightVoidImage"
            }
        }
        setDays(
            countDays()?.map((item:any, index: number) => {
                return <div key={index} id={`${id(index)}`} className={`${classNames(index)}`}>
                    <p>{item}</p>
                </div>
            }) 
        )
    }



    return(
        <>
            {
                getModalVisible && 
                    <Modal
                        getModalVisible={getModalVisible}
                        setModalVisible={setModalVisible}   
                        getModalDetails={getModalDetails}
                        getClickedDay={getClickedDay}           
                    />
            }
            
            <div id={"sliderContainer"} className={style.sliderContainer}>
                {getDays}
                <button onClick={swipeRight}>
                 LEFT
                </button>
                <button onClick={swipeLeft}>
                    RIGHT
                </button> 
            </div>
        </>
    )
}

const mapStateToProps = (state:ReducerType) => ({
    planned: state.planned
})


export default compose<SwiperPropsType,any>(
    connect(mapStateToProps),
  )(Swiper)
