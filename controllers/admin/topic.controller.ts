import { Response, Request } from "express";

// model 
import Topic from "../../models/topic.model";

// interface
import { findTopicInterface, filterStatusInterface, paginationInterface } from "../../config/interface";

// helper
import * as filterHelper from "../../helper/filter.helper";
import * as searchHelper from "../../helper/search.helper";

// [GET] /admin/topics/
export const index = async (req: Request, res: Response) => {
    try{
        const findObjectTopic: findTopicInterface = {
            deleted: false
        };

        // Filter stautus
        const status: string = `${req.query.status}` || "";
        if(req.query.status){    
            findObjectTopic["status"] = status;// không gán biến status vào vì nó sẽ bị tìm theo status = ""
        }
        const filterStatusArray: filterStatusInterface[] = filterHelper.status(req.query);
        // End Filter stautus
        
        // Search keyword
        const keyword: string = req.query.keyword ? `${req.query.keyword}` : undefined;
        const keywordObjectHelper = searchHelper.keywordAdvance(req.query);
        // End Search keyword

        // Pagination
        const paginationObject: paginationInterface = {
            limit: 5,
            current: 1
        }
        if(req.query.page){
            paginationObject.current = parseInt(`${req.query.page}`);
        }
        // End Pagination

        let sizeOfDocuments: number = 0;
        let topics; // contain records get

        if(req.query.keyword){
            sizeOfDocuments = await Topic.countDocuments({
                $or: [
                    {title: keywordObjectHelper.keywordRegexTitle},
                    {slug: keywordObjectHelper.keywordRegexSlug}
                ],
                ...findObjectTopic
            }); // count documents

            // pagination
            paginationObject.skip = (paginationObject.current - 1) * paginationObject.limit;
            paginationObject.total = Math.ceil((sizeOfDocuments/paginationObject.limit));

            // get database
            const record = await Topic.find({   
                $or: [
                    {title: keywordObjectHelper.keywordRegexTitle},
                    {slug: keywordObjectHelper.keywordRegexSlug}
                ],
                ...findObjectTopic
            }).limit(paginationObject.limit).skip(paginationObject.skip);
            topics = record;
        }
        
        else {
            sizeOfDocuments = await Topic.countDocuments(findObjectTopic); // count documents

            // pagination
            paginationObject.skip = (paginationObject.current - 1) * paginationObject.limit;
            paginationObject.total = Math.ceil((sizeOfDocuments/paginationObject.limit));

            const record = await Topic.find(findObjectTopic).limit(paginationObject.limit).skip(paginationObject.skip); // get database

            topics = record;
        }

        res.render('admin/pages/topics/index', {
            title: "Quản lý chủ đề bài hát",
            topics,
            filterStatusArray,
            keyword,
            sizeOfDocuments,
            paginationObject

        })
    }
    catch(error){
        console.log(error);
    }
}