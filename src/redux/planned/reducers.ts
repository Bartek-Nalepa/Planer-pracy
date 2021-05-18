import actions from "./actions";
import { PlannedType, SingleEventPlanned } from "./planned.type";

export default function plannedReducer(state = [], action: {type: string; payload: PlannedType|any}): any[] {

    function insertPlannedItem(array:PlannedType[], action:PlannedType) {
        let newArray = array.slice()
        newArray.splice(0, 0, action)
        return newArray
      }
      
    function updatePlannedObjectInArray(array:PlannedType[], ind: number, action:PlannedType) {
        return array.map((item:any, index:number) => {
            if (index !== ind) return item
            const planned:any = item.planned.concat(action.planned)
            return {
                ...item,
               planned
            }
        })
    }

    function removePlannedObjectInArray(array: PlannedType[], id: number){
        let index: number
        let newArray: PlannedType[] = array;
        array.forEach((item: PlannedType, idx: number)=> {
            index = item.planned.findIndex((el: SingleEventPlanned) => (el.id === id))
            //@ts-ignore
            newArray[idx].planned = newArray[idx].planned.filter((ele: SingleEventPlanned, idx2:number ) => idx2 !== index)
        })
        localStorage.setItem("planned", JSON.stringify(newArray))
        return newArray
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
            return removePlannedObjectInArray(state, action.payload)
        case actions.SET_INITIAL:
            const obj = JSON.parse(action.payload)
            return obj ? [...state, ...obj] : state
        default:
            return state
    }
}
