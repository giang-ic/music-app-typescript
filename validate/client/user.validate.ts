import { Response, Request, NextFunction } from "express";

// [POST] /user/register
export const register = (req: Request, res: Response, next: NextFunction) =>{
    if(!req.body.fullName){
        // ...thông báo flash
        res.redirect('back');
        return;
    }

    if(!req.body.email){
        // ...thông báo flash
        res.redirect('back');
        return;
    }

    if(!req.body.password){
        // ...thông báo flash
        res.redirect('back');
        return;
    }

    // next middleware
    next();
}

// [POST] /user/login
export const login = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.email){
        // ...thông báo flash
        res.redirect('back');
        return;
    }

    if(!req.body.password){
        // ...thông báo flash
        res.redirect('back');
        return;
    }

    // next middleware
    next();
}