import {Router, Express}  from "express";
import { systemConfig } from "../../config/system";
import { DashboardRouter } from "./dashboard.router";
import { TopicRouter } from "./topics.route";
import { SongRouter } from "./song.router";

const adminRouter = (app: Express): void => {
    const PATH_ADMIN = systemConfig.prefix_admin;
    
    app.use(
        `${PATH_ADMIN}/dashboard`,
        DashboardRouter
    );

    app.use(
        `${PATH_ADMIN}/topics`,
        TopicRouter
    );    

    app.use(
        `${PATH_ADMIN}/songs`,
        SongRouter
    );    

}

export default adminRouter;

