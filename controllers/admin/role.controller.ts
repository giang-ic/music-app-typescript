import Role from "../../models/role.model";

// instance expressjs
import { Response, Request } from "express";

// [GET] /admin/roles
export const index = async (req: Request, res: Response) => {
    try{
        res.render("admin/pages/roles/index", {
            title: "Nhóm quyền",
            
        })
    }
    catch(error){

    }
}