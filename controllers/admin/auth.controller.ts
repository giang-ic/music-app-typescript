// model
import Account from "../../models/account.model";

// instance Express
import { Response, Request } from "express";
import bcrypt from "bcrypt";

// system config
import { systemConfig } from "../../config/system";
const PATH_ADMIN: string = systemConfig.prefix_admin;

// [GET] /admin/auth/login
export const loginUI = async (req: Request, res: Response) => {
    try{
        res.render("admin/pages/auth/login", {
            title: "Đăng nhập"
        });
    }
    catch(error){

    }
}

// [POST] /admin/auth/login
export const login = async (req: Request, res: Response) => {
    try{
        const email: string = req.body.email;
        const password: string = req.body.password;

        // check email
        const user = await Account.findOne({
            email: email,
            deleted: false
        });

        if(!user){
            // thông báo flash
            res.redirect('back');
            return;
        }
        // end check email
        
        // check passowrd   
        bcrypt.compare(password, user.password, (err: any, result: any) => {
            if (err) {
                // Handle error
                console.error('Error comparing passwords:', err);
                return;
            }
        
            if (result) {
                // Passwords match, authentication successful
                console.log('Passwords match! User authenticated.');
            } 

            else {
                // Passwords don't match, authentication failed
                console.log('Passwords do not match! Authentication failed.');
                res.redirect('back');
                return;
            }
        });
        // end check password
        
        // check status
        if(user.status !== "active"){
            // thông báo flash
            res.redirect('back');
            return;
        }
        // end check status

        const timeCookie: number = 1000 * 60 * 60; // 1 hour
        res.cookie("token_user_login", user.token, { maxAge: timeCookie, httpOnly: true }); // set cookie with token user

        res.locals.user = user; // response locals variable
        res.redirect(PATH_ADMIN + '/dashboard');
    }
    catch(error){

    }
}

// [GET] /admin/auth/logout
export const logout = async (req: Request, res: Response) => {
    try{
        res.clearCookie("token_user_login");
        res.redirect(PATH_ADMIN + "/auth/login");
    }
    catch(error){

    }
}