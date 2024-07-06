import {Router, Express}  from "express";
import { systemConfig } from "../../config/system";
import { DashboardRouter } from "./dashboard.router";

const adminRouter = (app: Express): void => {
    const PATH_ADMIN = systemConfig.prefix_admin;
    
    app.use(
        `${PATH_ADMIN}/dashboard`,
        DashboardRouter
    );

}

export default adminRouter;

