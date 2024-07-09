// model 
import Singer from "../../models/singer.model";
import Topic  from "../../models/topic.model";

// instance Express
import { Request, Response } from "express";

// system config
import { systemConfig } from "../../config/system";
const PATH_ADMIN = systemConfig.prefix_admin;

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

// [GET] /admin/singers/create
export const createUI = async (req: Request, res: Response) => {
    try{
        res.render("admin/pages/singer/create", {
            title: "Thêm ca sĩ"
        })
    }
    catch(error){

    }
}

// [POST] /admin/singers/create
export const create = async (req: Request, res: Response) => {
    try{
        const record = new Singer(req.body);
        await record.save();
        res.redirect(PATH_ADMIN + '/singers/');
    }
    catch(error){
        
    }
}