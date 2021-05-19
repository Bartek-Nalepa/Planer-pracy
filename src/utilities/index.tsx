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

export function findInArray2x(array: any, key: string, value: string|number|null|boolean, key2: string, value2: string|number|null|boolean) {
    return array.find((element: any) => {
        return element[key] === value && element[key2] === value2
    })
}

export function replaceTextArea(str:string){
    
    return str.replace(/\n/g,"<br />")
}