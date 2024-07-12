import { Request, Response } from "express";

// model
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";

// helper
import * as filterHelper from "../../helper/filter.helper";
import * as searchHelper from "../../helper/search.helper";
import {index as paginationHelper} from "../../helper/pagination.helper";

// interface
import { filterStatusInterface, findSongInterface } from "../../config/interface";

// [GET] /admin/songs/
export const index = async (req: Request, res: Response) => {
    try{
        const findObjectSong: findSongInterface = {
            deleted: false
        }

        // filter
        const status: string = req.query.status ? `${req.query.status}` : undefined;
        if(status){
            findObjectSong["status"] = status;
        }
        const filterStatusArray: filterStatusInterface[] = filterHelper.status(req.query);
        // end filter

        // search
        const keyword: string = req.query.keyword ? `${req.query.keyword}` : undefined;
        const keywordObjectHelper = searchHelper.keywordAdvance(req.query);
        // end search

        // declare variable
        let songs;
        let sizeOfDocuments: number = 0;
        let paginationObject; // pagination

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

        if(req.query.keyword){
            sizeOfDocuments = await Song.countDocuments({
                $or: [
                    {title: keywordObjectHelper.keywordRegexTitle},
                    {slug: keywordObjectHelper.keywordRegexSlug}
                ],
                ...findObjectSong
            }); // count documents

            // pagination
            paginationObject = paginationHelper(req.query, 5, sizeOfDocuments);
            // get database
            const records = await Song.find({   
                $or: [
                    {title: keywordObjectHelper.keywordRegexTitle},
                    {slug: keywordObjectHelper.keywordRegexSlug}
                ],
                ...findObjectSong
            }).limit(paginationObject.limit)
            .skip(paginationObject.skip)
            .sort(sortObject);
            
            songs = records;
        }

        else {
            sizeOfDocuments = await Song.countDocuments(findObjectSong); // count documents

            // pagination
            paginationObject =  paginationHelper(req.query, 5, sizeOfDocuments);

            const records = await Song.find(findObjectSong)
                                    .limit(paginationObject.limit)
                                    .skip(paginationObject.skip)
                                    .sort(sortObject);
            songs = records;
        }

        res.render('admin/pages/songs/index', {
            title: "Danh sách bài nhạc",
            songs,
            filterStatusArray,
            keyword,
            sizeOfDocuments,
            paginationObject
        });
    }
    catch(error){
        console.log(error);
    }
}

// [GET] /admin/songs/create
export const createUI = async (req: Request, res: Response) => {
    try{
        const topics = await Topic.find({
            status: "active",
            deleted: false
        }).select("title");

        const singers = await Singer.find({
            status: "active",
            deleted: false
        }).select('fullName');

        res.render('admin/pages/songs/create', {
            title: "Tạo bài nhạc mới",
            topics,
            singers
        });
    }
    catch(error){

    }
}

// [POST] /admin/songs/create
export const create = async (req: Request, res: Response) => {
    try{
        if(req.body["avatar"]){
            req.body.avatar = req.body["avatar"][0]; // only one file avatar of music
        }

        if(req.body["audio"]){
            req.body.audio = req.body["audio"][0]; // only one file audio
        }
        const record = new Song(req.body);
        await record.save();
        res.redirect('back');
    }
    catch(error){

    }
}

// [GET] /admin/songs/edit/:songID
export const editUI = async (req: Request, res: Response) => {
    try{
        // get song needed edit
        const songID = req.params.songID;
        const song = await Song.findOne({
            _id: songID,
            status: "active",
            deleted: false
        });

        // get topics
        const topics = await Topic.find({
            status: "active",
            deleted: false
        });

        // get singers
        const singers = await Singer.find({
            status: "active",
            deleted: false
        });

        res.render("admin/pages/songs/edit", {
            title: "Chỉnh sửa bài nhạc",
            song,
            topics,
            singers
        });
    }
    catch(error){

    }
}

// [PATCH] /admin/songs/edit/:songID
export const edit = async (req: Request, res: Response) => {
    try{   
        const songID = req.params.songID;
        await Song.updateOne({
            _id: songID,
            status: "active",
            deleted: false
        },
        req.body
        )
        res.redirect('back');
    }
    catch(error){

    }
}

// [PATCH] /admin/songs/change-status/:status/:songID
export const changeStatus = async (req: Request, res: Response) => {
    try{
        const songID: string = req.params.songID;
        const status: string  = req.params.status;
        await Song.updateOne(
            {
                _id: songID,
                deleted: false
            },{
                status: status,
            }
        );

        res.json({
            code: 200,
            id: songID,
            status
        })
    }
    catch(error){

    }
}

// [PATCH] /admin/songs/change-multi
export const changeMulti = async (req: Request, res: Response) => {
    try{
        const type: string = req.body.type;
        const listID: string[] = (req.body.ids).split(", ");
        switch(type){
            case "active":
                await Song.updateMany(
                    {
                        _id: {$in : listID}
                    },
                    {
                        status: "active",
                    }
                );
                break;
            
            case "inactive":
                await Song.updateMany(
                    {
                        _id: {$in : listID}
                    },
                    {
                        status: "inactive",
                    }
                );
            case "position":
                for(const item of listID){
                    const [id, position] = item.split("-");
                    await Song.updateOne(
                        {_id: id},
                        {
                            position: position,
                        }
                    );
                }
                break;
            case "delete":
                await Song.updateMany(
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

// [PATCH] /admin/songs/delete-soft/:topicID
export const deleteSoft = async (req: Request, res: Response) => {
    try{
        const songID: string = req.params.songID;
        
        await Song.updateOne(
            {_id: songID},
            {
                status: "inactive",
                deleted: true,
            }
        );

        res.status(200).json({
            code: 200,
        })
    }
    catch(error){

    }
}

// [PATCH] /admin/songs/trash
export const trashUI = async (req: Request, res: Response) => {
    try{
        const findObjectSong: findSongInterface = {
            deleted: true
        };
        const songs = await Song.find(findObjectSong);

        // // get user
        // for(const topic of topics){
        //     const deletedFullName = await Account.findOne({
        //         _id: topic.deletedBy.account_id,
        //     }).select("fullName");
        //     topic["deletedFullName"] = deletedFullName ? deletedFullName.fullName : "Đang cập nhật";
        // }

        res.render("admin/pages/songs/trash",{
            title: "Bài nhạc đã xóa",
            songs
        })
    }
    catch(error){
        console.log(error);
    }
}

// [PATCH] /admin/songs/restore/:topicID
export const restore = async (req: Request, res: Response) => {
    try{
        const songID = req.params.songID;
        await Song.updateOne(
            {_id: songID},
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