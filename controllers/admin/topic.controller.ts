import { Response, Request } from "express";

// model 
import Topic from "../../models/topic.model";

// interface
import { findTopicInterface, filterStatusInterface, paginationInterface } from "../../config/interface";

// helper
import * as filterHelper from "../../helper/filter.helper";
import * as searchHelper from "../../helper/search.helper";
import {index as paginationHelper} from "../../helper/pagination.helper";

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

        let sizeOfDocuments: number = 0;
        let topics; // contain records get
        let paginationObject; // pagination
        
        if(req.query.keyword){
            sizeOfDocuments = await Topic.countDocuments({
                $or: [
                    {title: keywordObjectHelper.keywordRegexTitle},
                    {slug: keywordObjectHelper.keywordRegexSlug}
                ],
                ...findObjectTopic
            }); // count documents

            // pagination
            paginationObject = paginationHelper(req.query, 5, sizeOfDocuments);
            
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
            paginationObject =  paginationHelper(req.query, 5, sizeOfDocuments);

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

// [PATCH] /admin/topics/change-status/:topicID/:status
export const changeStatus = async (req: Request, res: Response) => {
    try{
        const topicID: string = req.params.topicID;
        const status: string  = req.params.status;

        await Topic.updateOne(
            {
                _id: topicID,
                deleted: false
            },{
                status: status
            }
        );

        res.json({
            code: 200,
            topicID,
            status
        })
    }
    catch(error){

    }
}

// [PATCH] /admin/topics/change-multi
export const changeMulti = async (req: Request, res: Response) => {
    try{
        const type: string = req.body.type;
        const listID: string[] = (req.body.ids).split(", ");

        switch(type){
            case "active":
                await Topic.updateMany(
                    {
                        _id: {$in : listID}
                    },
                    {
                        status: "active"
                    }
                );
                break;
            
            case "inactive":
                await Topic.updateMany(
                    {
                        _id: {$in : listID}
                    },
                    {
                        status: "inactive"
                    }
                );
            default: 
                break;
        }
        
        res.redirect('back');
    }
    catch(error){

    }
}