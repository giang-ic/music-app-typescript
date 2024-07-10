// interface
import { paginationInterface } from "../config/interface"

export const index = (query: any, limit: number, sizeOfDocuments: number): paginationInterface => {
    const paginationObject: paginationInterface = {
        limit: limit,
        current: 1
    }
    
    if(query.page){
        paginationObject.current = parseInt(`${query.page}`);
    }

    paginationObject.skip = (paginationObject.current - 1) * paginationObject.limit;
    paginationObject.total = Math.ceil((sizeOfDocuments/paginationObject.limit));

    return paginationObject;
}

