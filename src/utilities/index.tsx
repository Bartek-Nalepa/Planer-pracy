export function getId(){
    let id: any = localStorage.getItem("plannedIncrementalId") || 1
    id = parseInt(id) + 1
    localStorage.setItem("plannedIncrementalId", `${id}`)
    return id
}