import { Dispatch } from "redux";
import { PlannedType } from "../../redux/planned/planned.type";

export interface ModalPropsType {
    setModalVisible: (arg: boolean) => void 
    getModalVisible: boolean
    getModalDetails: PlannedType|undefined
    getClickedDay: string
    dispatch: Dispatch
    planned: PlannedType[]
}