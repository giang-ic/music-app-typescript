import Role from "../../models/role.model";

// system config
import { systemConfig } from "../../config/system";
const PATH_ADMIN = systemConfig.prefix_admin;

// instance expressjs
import { Response, Request } from "express";

// [GET] /admin/roles
export const index = async (req: Request, res: Response) => {
    try{
        const roles = await Role.find({
            deleted: false
        });

        res.render("admin/pages/roles/index", {
            title: "Nhóm quyền",
            roles
        })
    }
    catch(error){

    }
}

// [GET] /admin/roles/create
export const createUI = async (req: Request, res: Response) => {
    try{
        res.render("admin/pages/roles/create", {
            title: "Tạo nhóm quyền"
        })
    }
    catch(error){

    }
}

// [POST] /admin/roles/create
export const create = async (req: Request, res: Response) => {
    try{
        const record = new Role(req.body);
        await record.save();
        res.redirect(`${PATH_ADMIN}/roles`);
    }
    catch(error){

    }
}