// model 
import Singer from "../../models/singer.model";

// instance Express
import { Request, Response } from "express";

// [GET] /admin/singers/
export const index = async (req: Request, res: Response) => {
    try{
        const singers = await Singer.find({
            status: "active",
            deleted: false
        });

        res.render('admin/pages/singer/index', {
            title: "Danh sách ca sĩ",
            singers
        })
    }
    catch(error){
        
    }
}