// model

// instance Express
import { Response, Request } from "express";

// [GET] /admin/auth/register
export const loginUI = async (req: Request, res: Response) => {
    try{
        res.render("admin/pages/auth/login", {
            title: "Đăng nhập"
        });
    }
    catch(error){

    }
}