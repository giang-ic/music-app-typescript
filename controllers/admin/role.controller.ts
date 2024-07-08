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

// [GET] /admin/roles/permissions
export const permissionsUI = async (req: Request, res: Response) => {
    try{
        const roles = await Role.find({
            deleted: false
        });

        res.render("admin/pages/roles/permissions", {
            title: "Phân quyền",
            roles
        })
    }
    catch(error){

    }
}

// [PATCH] /admin/roles/permissions
export const permissions = async (req: Request, res: Response) => {
    try{
        const permissionsJS = JSON.parse(req.body.permissions);
        
        for(const item of permissionsJS){
            const roleID = item.id;
            const permissionsArray = item.permissions;
            
            // check các item trong array permissions có valid không ?

            await Role.updateOne(
                {
                    _id: roleID,
                    deleted: false
                },
                {
                    permissions: permissionsArray
                }
            );
        }
        res.redirect('back');
    }
    catch(error){
        
    }
}