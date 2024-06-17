// instance Response & Request 
import { Request, Response } from "express";

// models
import User from "../../models/user.model";

// [GET] /user/register
export const registerUI = async (req: Request, res: Response) => {
    try{
        res.render("client/pages/user/register", {
            title: "Đăng ký tài khoản"
        });
    }
    catch(error){

    }
}

// [POST] /user/register
export const register = async (req: Request, res: Response) => {
    try{

    }
    catch(error){}
}