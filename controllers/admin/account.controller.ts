// model
import Account from "../../models/account.model";
import { Request, Response } from "express";
import Role from "../../models/role.model";

// [GET] /admin/accounts/
export const index = async (req: Request, res: Response) => {
    try{
        const accounts = await Account.find({
            status: "active",
            deleted: false
        });

        res.render('admin/pages/account/index', {
            title: "Danh sách tài khoản",
            accounts
        })
    }
    catch(error){

    }
}

// [GET] /admin/accounts/create
export const createUI = async (req: Request, res: Response) => {
    try{
        const roles = await Role.find({
            deleted: false
        });
        res.render("admin/pages/account/create",{
            title: "Tạo tài khoản admin",
            roles
        });
    }
    catch(error){

    }
}