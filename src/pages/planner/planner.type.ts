import { Dispatch } from "redux";
import {PlannedType} from "../../redux/planned/planned.type"
export interface PlannerPropsType {
    planned: Array<PlannedType>
    dispatch: Dispatch
}