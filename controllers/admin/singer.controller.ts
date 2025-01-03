// model 
import Singer from "../../models/singer.model";
import Topic  from "../../models/topic.model";
import Account from "../../models/account.model";

// instance Express
import { Request, Response } from "express";

// system config
import { systemConfig } from "../../config/system";
const PATH_ADMIN = systemConfig.prefix_admin;

// helper
import * as filterHelper from "../../helper/filter.helper";
import * as searchHelper from "../../helper/search.helper";
import {index as paginationHelper} from "../../helper/pagination.helper";

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

        // sort citeria
        const sortObject = {};

        if(req.query.sortKey && req.query.sortValue){
            const sortKey: string = `${req.query.sortKey}`;
            const sortValue: string = `${req.query.sortValue}`;

            sortObject[sortKey] = sortValue;
        }
        else {
            sortObject["position"] = "desc";
        }
        // end sort citeria

        // declare 
        let singers;
        let sizeOfDocuments: number = 0;
        let paginationObject; // pagination

        if(req.query.keyword){
            sizeOfDocuments = await Singer.countDocuments({
                $or: [
                    {title: keywordObjectHelper.keywordRegexTitle},
                    {slug: keywordObjectHelper.keywordRegexSlug}
                ],
                ...findObjectSinger
            }); // count documents

            // pagination
            paginationObject =  paginationHelper(req.query, 5, sizeOfDocuments);


            // get database
            const records = await Singer.find({   
                $or: [
                    {title: keywordObjectHelper.keywordRegexTitle},
                    {slug: keywordObjectHelper.keywordRegexSlug}
                ],
                ...findObjectSinger
            }).limit(paginationObject.limit)
            .skip(paginationObject.skip)
            .sort(sortObject);
            
            singers = records;

        }
        else{
            sizeOfDocuments = await Topic.countDocuments(findObjectSinger); // count documents

            // pagination
            paginationObject =  paginationHelper(req.query, 5, sizeOfDocuments);

            const records = await Singer.find(findObjectSinger)
                                        .limit(paginationObject.limit)
                                        .skip(paginationObject.skip)
                                        .sort(sortObject);
            singers = records;

        }
        
        // get user
        for(const singer of singers){
            const createdFullName = await Account.findOne({
                _id: singer.createdBy.account_id,
            }).select("fullName");
            
            singer["createdFullName"] = createdFullName ? createdFullName.fullName : "Đang cập nhật";

        }
        res.render('admin/pages/singer/index', {
            title: "Danh sách ca sĩ",
            singers,
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
        req.body["createdBy"] = {
            account_id: res.locals.user._id
        }

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

// [PATCH] /admin/singers/change-status/:status/:singerID
export const changeStatus = async (req: Request, res: Response) => {
    try{
        const singerID: string = req.params.singerID;
        const status: string  = req.params.status;

        await Singer.updateOne(
            {
                _id: singerID,
                deleted: false
            },{
                status: status,
                // $push: {
                //     updatedBy: {
                //         account_id: res.locals.user._id,
                //         did: "Thay đổi trạng thái chủ đề",
                //         updatedAt: Date.now()
                //     }
                // }   
            }
        );

        res.json({
            code: 200,
            id: singerID,
            status
        })
    }
    catch(error){

    }
}

// [PATCH] /admin/singers/change-multi
export const changeMulti = async (req: Request, res: Response) => {
    try{
        const type: string = req.body.type;
        const listID: string[] = (req.body.ids).split(", ");
        switch(type){
            case "active":
                await Singer.updateMany(
                    {
                        _id: {$in : listID}
                    },
                    {
                        status: "active",
                        // $push: {
                        //     updatedBy: {
                        //         account_id: res.locals.user._id,
                        //         did: "Thay đổi trạng thái chủ đề",
                        //         updatedAt: Date.now()
                        //     }
                        // }   
                    }
                );
                break;
            
            case "inactive":
                await Singer.updateMany(
                    {
                        _id: {$in : listID}
                    },
                    {
                        status: "inactive",
                        // $push: {
                        //     updatedBy: {
                        //         account_id: res.locals.user._id,
                        //         did: "Thay đổi trạng thái chủ đề",
                        //         updatedAt: Date.now()
                        //     }
                        // }   
                    }
                );
            case "position":
                for(const item of listID){
                    const [id, position] = item.split("-");
                    await Singer.updateOne(
                        {_id: id},
                        {
                            position: position,
                            // $push: {
                            //     updatedBy: {
                            //         account_id: res.locals.user._id,
                            //         did: "Thay đổi vị trí chủ đề",
                            //         updatedAt: Date.now()
                            //     }
                            // }   
                        }
                    );
                }
                break;
            case "delete":
                await Singer.updateMany(
                    {
                        _id: {$in : listID}
                    },
                    {
                        status: "inactive",
                        deleted: true,
                    }
                );
                break;
            default: 
                break;
        }
        res.redirect('back');
    }
    catch(error){

    }
}

// [PATCH] /admin/singers/delete-soft/:singerID
export const deleteSoft = async (req: Request, res: Response) => {
    try{
        const singerID: string = req.params.singerID;
        
        await Singer.updateOne(
            {_id: singerID},
            {
                status: "inactive",
                deleted: true,
                deletedBy: {
                    account_id: res.locals.user._id,
                    deletedAt: Date.now()
                }
            }
        );

        res.status(200).json({
            code: 200,
        })
    }
    catch(error){

    }
}

// [PATCH] /admin/singers/trash
export const trashUI = async (req: Request, res: Response) => {
    try{
        const findObjectSinger: findSingerInterface = {
            deleted: true
        };
        const singers = await Singer.find(findObjectSinger);

        // get user
        for(const singer of singers){
            const deletedFullName = await Account.findOne({
                _id: singer.deletedBy.account_id,
            }).select("fullName");
            singer["deletedFullName"] = deletedFullName ? deletedFullName.fullName : "Đang cập nhật";
        }

        res.render("admin/pages/singer/trash",{
            title: "Ca sĩ đã xóa",
            singers
        })
    }
    catch(error){
        console.log(error);
    }
}

// [PATCH] /admin/singers/restore/:singerID
export const restore = async (req: Request, res: Response) => {
    try{
        const singerID = req.params.singerID;
        await Singer.updateOne(
            {_id: singerID},
            {
                deleted: false,
                // $push: {
                //     updatedBy: {
                //         account_id: res.locals.user._id,
                //         did: "Khôi phục chủ đề đã xóa",
                //         updatedAt: Date.now()
                //     }
                // }   
            }
        );
        res.status(200).json({
            code: 200
        });
    }
    catch(error){
        console.log(error);
    }
}

// [GET] /admin/topics/detail/:singerID
export const detailUI = async (req: Request, res: Response) => {
    try{
        const singerID: string = req.params.singerID;
        const singer = await Singer.findOne({ _id: singerID });
        res.render("admin/pages/singer/detail", {
            title: "Chi tiết ca sĩ",
            singer
        })
    }
    catch(error){

    }
}