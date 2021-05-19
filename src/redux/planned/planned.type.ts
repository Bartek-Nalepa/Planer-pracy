export interface PlannedType {
    date: string;
    color: string
    dayOff: boolean
    planned: [{
        id: number
        time: string
        prio: string
        message: string
        done: boolean
    }]
}

export interface SingleEventPlanned {
    id: number
    time: string
    message: string
    prio: string
    done: boolean
}