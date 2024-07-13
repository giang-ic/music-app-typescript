// model 
import Singer from "../../models/singer.model";
import Topic  from "../../models/topic.model";

// instance Express
import { Request, Response } from "express";

// system config
import { systemConfig } from "../../config/system";
const PATH_ADMIN = systemConfig.prefix_admin;

// helper
import * as filterHelper from "../../helper/filter.helper";
import * as searchHelper from "../../helper/search.helper";

// interface
import { findSingerInterface, filterStatusInterface } from "../../config/interface";

// [GET] /admin/singers/
export const index = async (req: Request, res: Response) => {
    try{
        const findObjectSinger: findSingerInterface = {
            deleted: false
        }

        // Filter stautus
        const status: string = `${req.query.status}` || "";
        if(req.query.status){    
            findObjectSinger["status"] = status;// không gán biến status vào vì nó sẽ bị tìm theo status = ""
        }

        const filterStatusArray: filterStatusInterface[] = filterHelper.status(req.query);
        // End Filter stautus

        // Search keyword
        const keyword: string = req.query.keyword ? `${req.query.keyword}` : undefined;
        const keywordObjectHelper = searchHelper.keywordAdvance(req.query);
        // End Search keyword


        // declare 
        let singers;

        if(req.query.keyword){
            // get database
            const records = await Singer.find({   
                $or: [
                    {title: keywordObjectHelper.keywordRegexTitle},
                    {slug: keywordObjectHelper.keywordRegexSlug}
                ],
                ...findObjectSinger
            })
            
            singers = records;

        }
        else{
            const records = await Singer.find(findObjectSinger);
            singers = records;

        }
        

        res.render('admin/pages/singer/index', {
            title: "Danh sách ca sĩ",
            singers,
            filterStatusArray,
            keyword
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

// [GET] /admin/singers/edit/:singerID
export const editUI = async (req: Request, res: Response) => {
    try{
        const singerID: string = req.params.singerID;
        const singer = await Singer.findOne({
            _id: singerID,
            status: "active",
            deleted: false
        });

        res.render("admin/pages/singer/edit", {
            title: "Chỉnh sửa thông tin ca sĩ",
            singer
        })
    }
    catch(error){

    }
}

// [PATCH] /admin/singers/edit/:singerID
export const edit = async (req: Request, res: Response) => {
    try{
        const singerID = req.params.singerID;
        await Singer.updateOne(
            {
                _id: singerID,
                status: "active",
                deleted: false
            },
            req.body
        );
        res.redirect('back');
    }
    catch(error){

    }
}