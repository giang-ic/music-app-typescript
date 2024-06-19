import { Request, Response, NextFunction } from "express";
import User from "../../models/user.model";

/**
 * This middleware has the role of checking whether the user is logged in or not
 */
export const accessLogin = async (req: Request, res: Response, next: NextFunction) => {
    try{
        if(req.cookies.tokenUser){
            const tokenUser = req.cookies.tokenUser;

            // token's user is valid ?
            const user = await User.findOne({
                tokenUser: tokenUser,
                status: "active",
                deleted: false
            }).select("-password");

            if(user){
               res.locals.user = user;
            }
        }
        next();
    }
    catch(error){
        console.log(error);
    }
}

/**
 * This middleware has the role of checking whether the token user is exist or not
 */
export const accessResetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try{
        if(!req.cookies.token_user_otp){
            res.redirect('/user/password/forgot');
            return;
        }

        const isValidToken = await User.findOne({
            tokenUser: req.cookies.token_user_otp,
            status: "active",
            deleted: false
        });

        if(!isValidToken){
            res.redirect('/user/password/forgot');
            return;
        }

        // next middleware
        next();
    }
    catch(error){

    }
}

/**
 * This middleware has the role of checking whether the user is logged in or not, serve for like or favorite 
 */

export const accessActive = async (req: Request, res: Response, next: NextFunction) => {
    try{
        if(req.cookies.tokenUser){
            const tokenUser = req.cookies.tokenUser;

            // token's user is valid ?
            const user = await User.findOne({
                tokenUser: tokenUser,
                status: "active",
                deleted: false
            }).select("-password");

            if(user){
               res.locals.user = user;
               next();
               return;
            }
        }

        res.status(400).json({
            code: 400,
            message: "Đăng nhập rồi mới cho like hoặc yêu thích bài nhạc"
        });
        
    }
    catch(error){
        console.log(error);
    }
}