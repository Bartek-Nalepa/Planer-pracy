import actions from "./actions";
import { PlannedType, SingleEventPlanned } from "./planned.type";

export default function plannedReducer(state = [], action: {type: string; payload: PlannedType|any}): any[] {

    function insertPlannedItem(array:PlannedType[], action:PlannedType) {
        let newArray = array.slice()
        if (action.planned) {
            newArray.splice(0, 0, {...action})
        }
        else {
            // @ts-ignore
            newArray.splice(0, 0, {...action,planned:[]})
        }
        return newArray
      } 
      
    function updatePlannedObjectInArray(array:PlannedType[], ind: number, action:PlannedType) {
        return array.map((item:any, index:number) => {
            if (index !== ind) return item
            if (item.planned?.length > 0) {
                const planned:any = item.planned.concat(action.planned)
                return {
                    ...item,
                   planned
                }
            }
            else {
                return {
                    ...item,
                   planned: [
                       ...action.planned
                   ]
                }
            }
            
        })
    }

    function markAsDone(array:PlannedType[], action: {id:number} ){
        let index: number
        let newArray: PlannedType[] = state;
        state.forEach((item: PlannedType, idx: number)=> {
            index = item.planned.findIndex((el: SingleEventPlanned) => {
                return el.id === action.id
            })
            if (index === -1) return
            newArray[idx].planned[index].done = true
        })
        return [...newArray]
        
    }

    switch (action.type) {
        case actions.SET_PLANNER: 
            const newNode: any = state.findIndex((el:PlannedType) => {
                return el.date === action.payload.date
            })
 
            if (newNode !== -1 && newNode >= 0) {
                localStorage.setItem("planned", JSON.stringify(updatePlannedObjectInArray(state, newNode, action.payload)))
                return updatePlannedObjectInArray(state, newNode, action.payload)
            } 
            else {
                localStorage.setItem("planned", JSON.stringify(insertPlannedItem(state, action.payload)))
                return insertPlannedItem(state, action.payload)
            }
        case actions.REMOVE_PLANNER:
            // removePlannedObjectInArray(state, action.payload)
            let index: number
            let newArray: PlannedType[] = state;
            state.forEach((item: PlannedType, idx: number)=> {
                index = item.planned.findIndex((el: SingleEventPlanned) => (el.id === action.payload))
                //@ts-ignore
                newArray[idx].planned = newArray[idx].planned.filter((ele: SingleEventPlanned, idx2:number ) => idx2 !== index)
            })
            localStorage.setItem("planned", JSON.stringify(newArray))
            return [...newArray]
        case actions.SET_DAYOFF:
            const nwNode: any = state.findIndex((el:PlannedType) => {
                return el.date === action.payload.date
            })
            if (nwNode !== -1 && nwNode >= 0) {
                const nwArray:any = state.map((item:any, index:number) => {
                    if (index !== nwNode) return item
                    return {
                        ...item,
                        dayOff: action.payload.dayOff,
                        planned: [
                            ...item.planned
                        ]
                    }
                })
                localStorage.setItem("planned", JSON.stringify(nwArray))
                return [...nwArray]
            }
            else {
                localStorage.setItem("planned", JSON.stringify(insertPlannedItem(state, action.payload)))
                return insertPlannedItem(state, action.payload)
            }
        case actions.SET_DONE:
            const x = markAsDone(state, action.payload)
            localStorage.setItem("planned", JSON.stringify(x))
            return x
        case actions.SET_COLOR:
            const newNode2: any = state.findIndex((el:PlannedType) => {
                return el.date === action.payload.date
            })
            if (newNode2 !== -1 && newNode2 >= 0) {
                const nwArray:any = state.map((item:any, index:number) => {
                    if (index !== newNode2) return item
                    return {
                        ...item,
                        color: action.payload.color,
                        planned: [
                            ...item.planned
                        ]
                    }
                })
                localStorage.setItem("planned", JSON.stringify(nwArray))
                return [...nwArray]
            }
            else {
                localStorage.setItem("planned", JSON.stringify(insertPlannedItem(state, action.payload)))
                return insertPlannedItem(state, action.payload)
            }
        case actions.SET_INITIAL:
            const obj = JSON.parse(action.payload)
            return obj ? [...state, ...obj] : state
        default:
            return state
    }
}
