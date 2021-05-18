export interface PlannedType {
    date: string;
    color: string
    isDayOff: boolean
    planned: [{
        id: number
        time: string
        message: string
    }]
}

export interface SingleEventPlanned {
    id: number
    time: string
    message: string
}