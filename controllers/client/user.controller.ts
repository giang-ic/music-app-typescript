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
export const login = async (req: Request, res: Response) => {
    try{
        // is email exits ?
        const user = await User.findOne({
            email: req.body.email,
            deleted: false
        });

        if(!user){
            // ...thông báo email không tồn tại
            res.redirect('back');
            return;
        }

        // is user active ?
        if(user.status != "active"){
            // ...thông báo tài khoản đã dừng hoạt động
            res.redirect('back');
            return;
        }

        // compare(verify) password
        const passwordLogin = req.body.password;
        bcrypt.compare(passwordLogin, user.password, (err, result) => {
            if (err) {
                // Handle error
                console.error('Error comparing passwords:', err);
                return;
            }
        
            if(result) {
                // Passwords match, authentication successful
                console.log('Passwords match! User authenticated.');

                // set cookie
                res.cookie('tokenUser', user.tokenUser, {
                    maxAge: 1000 * 60 * 60, //expire cookie: 1h 
                    httpOnly: true
                });
                
                res.redirect('/topics');
            } 
            else {
                // Passwords don't match, authentication failed
                console.log('Passwords do not match! Authentication failed.');
                // ...thông báo mật khẩu không chính xác
            }
        });
        
    }
    catch(error){

    }
}

// [GET] /user/logout
export const logout = async (req: Request, res: Response) => {
    try{
        // clear cookies
        res.clearCookie('tokenUser');

        res.redirect('/topics');
    }
    catch(error){

    }
}

// [GET] /user/password/forgot
export const forgotPasswordUI = async (req: Request, res: Response) => {
    try{
        res.render('client/pages/user/forgot-password', {
            title: "Quên mật khẩu"
        })
    }
    catch(error){

    }
}

// [POST] /user/password/forgot
export const forgotPassword = async (req: Request, res: Response) => {
    try{
        // email is valid ?
        const user = await User.findOne({
            email: req.body.email,
            status: "active",
            deleted: false
        }).select("-password");

        if(!user){
            // ...thông báo email không hợp lệ
            res.redirect('back');
            return;
        }

        res.redirect('back');
    }
    catch(error){

    }
}