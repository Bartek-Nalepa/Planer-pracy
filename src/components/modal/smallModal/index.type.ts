import { Dispatch } from "redux";

export interface SmallModalPropsType {
    date: string
    setVisibleSmallModal: (arg:boolean) => void
    dispatch: Dispatch
}