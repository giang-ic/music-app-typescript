// instance Express
import { Response, Request, NextFunction } from "express";

// model
import Account from "../../models/account.model";
import Role from "../../models/role.model";

// system config
import { systemConfig } from "../../config/system";
const PATH_ADMIN: string = systemConfig.prefix_admin;

// serve for private /admin
export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const tokenUserLogin: string = req.cookies.token_user_login; // cookie

        // check cookie
        const user = await Account.findOne({
            token: tokenUserLogin,
            deleted: false
        });

        if(!user){
            // thông báo flash
            res.redirect(PATH_ADMIN + '/auth/login');
            return;
        }
        // end check cookie

        // check status
        if(user.status !== "active"){
            // thông báo flash
            res.redirect(PATH_ADMIN + '/auth/login');
            return;
        }
        // end check status

        // role of user
        const role = await Role.findOne({
            _id: user.role_id,
            deleted: false
        });

        res.locals.user = user;
        res.locals.role = role;

        next(); // next middlware
    }
    catch(error){

    }
}