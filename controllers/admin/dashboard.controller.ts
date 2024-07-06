import { Response, Request } from "express";

// [GET] /admin/dashboard
export const index = async (req: Request, res: Response) => {
    try{
        res.render("admin/pages/dashboard/index", {
            title: "Trang tổng quan"
        });
    }
    catch(error){

    }
}