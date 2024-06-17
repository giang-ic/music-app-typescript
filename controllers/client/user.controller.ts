// instance Response & Request 
import { Request, Response } from "express";
import bcrypt  from "bcrypt";
const saltRounds = 10; // Typically a value between 10 and 12

// models
import User from "../../models/user.model";

// helper
import * as generateHelper from "../../helper/generate.helper";

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
        // is email exist ?
        const user = await User.findOne({
            email: req.body.email,
            deleted: false
        });

        if(user){
            // ...thông báo flash
            return;
        }

        // hashing password
        const password = req.body.password; 
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                // Handle error
                return;
            }

            // Hashing successful, 'hash' contains the hashed password
            const record = new User({
                fullName: req.body.fullName,
                email: req.body.email,
                password: hash,
                tokenUser: generateHelper.randomString(20)
            });

            // save on database
            await record.save();
        });
        res.redirect('/user/login');
    }
    catch(error){
        console.log(error);
    }
}

// [GET] /user/login
export const loginUI = async (req: Request, res: Response) => {
    try{
        res.render('client/pages/user/login', {
            title: "Đăng nhập"
        });
    }
    catch(error){

    }
}


// [POST] /user/login