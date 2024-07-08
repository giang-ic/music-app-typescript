// model
import Account from "../../models/account.model";
import { Request, Response } from "express";

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