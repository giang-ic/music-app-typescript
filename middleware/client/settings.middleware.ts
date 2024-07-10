// model
import SettingGeneral from "../../models/setting-general.model";

// instance express
import { Request, Response, NextFunction } from "express";

export const settingGeneral = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const settingGeneral = await SettingGeneral.findOne({});

        res.locals.settingGeneral = settingGeneral; // response locals

        next(); // next middlware

    }
    catch(error){

    }
} 