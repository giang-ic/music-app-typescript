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