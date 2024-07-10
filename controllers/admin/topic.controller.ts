import { Response, Request } from "express";

// model 
import Topic from "../../models/topic.model";

// [GET] /admin/topics/
export const index = async (req: Request, res: Response) => {
    try{
        interface findInterfaceTopic {
            status?: string,
            deleted: boolean
        }   
        
        const findObjectTopic: findInterfaceTopic = {
            deleted: false
        };

        // Filter stautus
        const status: string = `${req.query.status}`;
        if(status){
            findObjectTopic["status"] = status;
        }
        // End Filter stautus
        
        const topics = await Topic.find(findObjectTopic);

        res.render('admin/pages/topics/index', {
            title: "Quản lý chủ đề bài hát",
            topics
        })
    }
    catch(error){

    }
}