import actions from "./actions";
import { PlannedType } from "./planned.type";

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

    switch (action.type) {
        case actions.SET_PLANNER:

            const newNode: any = state.findIndex((el:PlannedType) => {
                return el.date === action.payload.date
            })

            if (newNode != -1 && newNode >= 0) {
                localStorage.setItem("planned", JSON.stringify(updatePlannedObjectInArray(state, newNode, action.payload)))
                return updatePlannedObjectInArray(state, newNode, action.payload)
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
