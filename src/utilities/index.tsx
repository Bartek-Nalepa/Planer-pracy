export function getId(){
    let id: any = localStorage.getItem("plannedIncrementalId") || 1
    id = parseInt(id) + 1
    localStorage.setItem("plannedIncrementalId", `${id}`)
    return id
}

export function fixTimeFormat(value: string|number|undefined){
    if (String(value).length === 1) return `0${value}`
    else if (String(value).length === 2) return `${value}`
    else return ""
}