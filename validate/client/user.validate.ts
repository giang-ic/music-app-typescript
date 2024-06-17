import { Response, Request, NextFunction } from "express";

// [POST] /user/register
export const register = (req: Request, res: Response, next: NextFunction) =>{
    if(!req.body.fullName){
        // req.flash('warning', 'Bạn cần điền đầy đủ họ tên');
        res.redirect('back');
        return;
    }

    if(!req.body.email){
        res.redirect('back');
        return;
    }

    if(!req.body.password){
        res.redirect('back');
        return;
    }

    // next middleware
    next();
}