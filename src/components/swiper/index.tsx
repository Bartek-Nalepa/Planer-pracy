import React, { useEffect, useState } from "react"
import moment from "moment"
import {compose} from "recompose";
import style from "./index.module.scss"
import {connect} from "react-redux"
import { SwiperPropsType } from "./index.type"
import { momentFormat } from "../../config/ENV_CON"
import Modal from "../modal"
import { PlannedType, SingleEventPlanned } from "../../redux/planned/planned.type"
import { ReducerType } from "../../redux/reducer.type"
import { element } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

function Swiper(props: SwiperPropsType) {

    const {getCurrentDay, setCurrentDay, planned} = props
    const [getModalVisible, setModalVisible] = useState<boolean>(false)
    const [getModalDetails, setModalDetails] = useState<PlannedType>()
    const [getClickedDay, setClickedDay] = useState<string>('')
    const [getClickedId, setClickedId] = useState<string>()
    const [getDays, setDays] = useState<any>()

    useEffect(() => {
        generateDays()
    }, [])

    // "Update Card with new view"
    useEffect(() => {
        planned.find((element: PlannedType) => element.date === getClickedDay)
        const el = document?.getElementById(`${getClickedId}`)
        const triangle = el?.getElementsByClassName("triangle")[0]
        el?.getElementsByTagName("ul")[0]?.remove()

        let ul = document.createElement("ul")
        const lis:PlannedType|undefined = planned?.find((item: PlannedType) => {
            return item.date === getClickedDay
        })
        lis?.planned.forEach((element:SingleEventPlanned) => {
            let li = document.createElement("li") 
            li.append(element.message)
            ul.append(li)
        });
        el?.append(ul)
        //@ts-ignore
        if (triangle) triangle.style.borderTopColor = `${lis?.color}` || "transparent"

    }, [planned])

    const setDetails = (e:any) => {
        const day: string = e.currentTarget.getAttribute("day")
        setClickedDay(day)
        setClickedId(e.currentTarget.getAttribute("id"))
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
        const rightList = right?.getElementsByTagName('ul')[0];
        const centerList = center?.getElementsByTagName('ul')[0];
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
        
        rightList?.classList.add("cardList")
        rightList?.classList.remove("smallerCardList")
        centerList?.classList.add("smallerCardList")
        centerList?.classList.remove("cardList")

        let div = document.createElement("div")
        let h2 = document.createElement('h2')
        let hr = document.createElement("hr")
        let ul = document.createElement("ul")
        let triangle = document.createElement("div")

        const lis:PlannedType|undefined = planned?.find((item: PlannedType) => {
            return item.date === moment(getCurrentDay,momentFormat).add(3, "days").format(momentFormat)
        })
        h2.append(moment(getCurrentDay,momentFormat).add(3, "days").format(momentFormat))
        lis?.planned.forEach((element:SingleEventPlanned) => {
            let li = document.createElement("li") 
            li.append(element.message)
            ul.append(li)
        });
        ul.classList.add("smallerCardList")
        triangle.classList.add("triangle")
        triangle.style.borderTopColor = `${lis?.color || "transparent"}`
        div.id = "rightVoid"
        div.className = "rightVoidImage"
        div.setAttribute("day", `${moment(getCurrentDay, momentFormat).add(3,"days").format(momentFormat)}`)
        div.onclick = (e:any) => setDetails(e)
        div.append(triangle, h2,hr, ul)
        container?.appendChild(div)
        
    }

    function swipeRight(){ // CLICK LEFT
        const container = document.getElementById("sliderContainer")
        const leftVoid = document.getElementById("leftVoid")
        const left = document.getElementById("left")
        const center = document.getElementById("center")
        const right = document.getElementById("right")
        const rightVoid = document.getElementById("rightVoid")
        const leftList = left?.getElementsByTagName('ul')[0];
        const centerList = center?.getElementsByTagName('ul')[0];
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
        leftList?.classList.add("cardList")
        leftList?.classList.remove("smallerCardList")
        centerList?.classList.add("smallerCardList")
        centerList?.classList.remove("cardList")

        let div = document.createElement("div")
        let h2 = document.createElement('h2')
        let hr = document.createElement("hr")
        let ul = document.createElement("ul")
        let triangle = document.createElement("div")
        const lis:PlannedType|undefined = planned?.find((item: PlannedType) => {
            return item.date === moment(getCurrentDay,momentFormat).subtract(3, "days").format(momentFormat)
        })
        h2.append(moment(getCurrentDay,momentFormat).subtract(3, "days").format(momentFormat))
        lis?.planned.forEach((element:SingleEventPlanned) => {
            let li = document.createElement("li") 
            li.append(element.message)
            ul.append(li)
        });
        ul.classList.add("smallerCardList")
        triangle.classList.add("triangle")
        triangle.style.borderTopColor = `${lis?.color || "transparent"}`
        console.log(triangle)
        div.id = "leftVoid"
        div.className = "leftVoidImage"
        div.setAttribute("day", `${moment(getCurrentDay, momentFormat).subtract(3,"days").format(momentFormat)}`)
        div.onclick = (e:any) => setDetails(e)
        div.append(triangle, h2, hr, ul)


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
        const listClassNames = (index:number) => {
            if (index === 2) return "cardList"
            else return "smallerCardList"

        }
        setDays(
            countDays()?.map((item:any, index: number) => {
                const cheatTs = {day: item}
                const lis:PlannedType|undefined = planned?.find((element:PlannedType) => item === element.date)

                return <div 
                    {...cheatTs}
                    key={index}
                    id={`${id(index)}`} 
                    className={`${classNames(index)}`}
                    onClick={(e:any) => {setDetails(e)}}    
                >
                    <div style={lis?.color ? {borderTopColor: `${lis?.color}`}:{borderTopColor: "transparent"}} className={"triangle"} />
                    <h2>{item}</h2>
                    <hr/ >
                    <ul className={`${listClassNames(index)}`}>
                      {
                          lis?.planned?.map((element: SingleEventPlanned) => {
                            return <li>
                                {element.message}
                            </li>
                          })
                      }
                    </ul>
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
            </div>
            <div className={style.swiperBtnsContainer}>
                <FontAwesomeIcon onClick={swipeRight} className={style.iconBtn} icon={faArrowCircleLeft} />
                <FontAwesomeIcon onClick={swipeLeft} className={style.iconBtn} icon={faArrowCircleRight} />
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
