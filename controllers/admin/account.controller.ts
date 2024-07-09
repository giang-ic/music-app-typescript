// model
import Account from "../../models/account.model";
import { Request, Response } from "express";
import Role from "../../models/role.model";
import { systemConfig } from "../../config/system";
import bcrypt from "bcrypt";    

// system config
const PATH_ADMIN = systemConfig.prefix_admin;
const saltRounds = 10; // Typically a value between 10 and 12 (Brcypt)

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

// [POST] /admin/accounts/create
export const create = async (req: Request, res: Response) => {
    try{
        // check email
        const email: string = req.body["email"];
        const emailExists = await Account.findOne({
            email: email,
            deleted: false
        }).select("-password");

        if(emailExists){
            // thông báo flash
            res.redirect('back');
            return;

        }
        // end check email

        // hashing password & save
        const password: string = req.body["password"];
        delete req.body.password;

        bcrypt.hash(password, saltRounds, async (err: any, hash: string) => {
            // Hashing successful, 'hash' contains the hashed password
            const record = new Account({
                ...req.body,
                password: hash
            });
            await record.save();
        });
        // end hashing password & save

        res.redirect(PATH_ADMIN + '/accounts/');
    }
    catch(error){

    }
}

// [GET] /admin/accounts/edit/:accountID
export const editUI = async (req: Request, res: Response) => {
    try{
        const accountID: string = req.params.accountID;

        const account = await Account.findOne({
            _id: accountID,
            status: "active",
            deleted: false
        }).select("-password");

        const roles = await Role.find({
            deleted: false
        }).select("-description");

        res.render('admin/pages/account/edit', {
            title: "Chỉnh sửa tài khoản",
            account,
            roles
        })
    }
    catch(error){

    }
}

// [PATCH] /admin/accounts/edit/:accountID
export const edit = async (req: Request, res: Response) => {
    try{
        const accountID: string = req.params.accountID;
        const email: string = req.body.email;
        console.log([...req.body]);
        // check email [find email with different myID]
        const emailExist = await Account.findOne({
            _id: {$ne: accountID},
            email: email,
            status: "active",
            deleted: false
        });

        if(emailExist){
            // thông báo flash
            res.redirect('back');
            return;
        }
        // end check email

        // check password & hashing [is empty then not update password]
        const password: string = req.body.password;
        delete req.body.password;

        if(password !== '') {
            req.body["password"] = await new Promise((resolve, reject) => {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    resolve(hash)
                });
              })
        }
        // end check password & hashing

        // update
        await Account.updateOne(
            {
                _id: accountID,
                email: email,
                status: "active",
                deleted: false
            },
            {
                ...req.body,
            }
        );
        // end update 
        
        res.redirect('back');
    }
    catch(error){

    }
}