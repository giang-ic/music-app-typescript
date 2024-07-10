// model interface
export interface findTopicInterface {
    title?: string,
    status?: string,
    deleted: boolean, 
}   


// interface filter status 
export interface filterStatusInterface {
    name: string,
    status: string,
    class?: string
}
// end interface filter status 

// interface pagination
export interface paginationInterface {
    limit: number,
    current: number,
    skip?: number,
    total?: number
}
// interface pagination
