import { PlannedType } from "../../redux/planned/planned.type";

export interface SwiperPropsType {
    setCurrentDay: (arg:string) => void
    getCurrentDay: string
    planned: PlannedType[]
}