// instance Express
import { Request, Response } from "express";

// model
import SettingGeneral from "../../models/setting-general.model";

// [GET] /admin/settings/general
export const generalUI = async (req: Request, res: Response) => {
    try{
        const settingGeneral = await SettingGeneral.findOne({});
        
        res.render("admin/pages/settings/general",
            {
                title: "Cài đặt chung",
                settingGeneral
            }
        )
    }
    catch(error){

    }
}