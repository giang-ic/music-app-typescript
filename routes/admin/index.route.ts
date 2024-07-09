import {Router, Express}  from "express";
import { systemConfig } from "../../config/system";
import { DashboardRouter } from "./dashboard.router";
import { TopicRouter } from "./topics.route";
import { SongRouter } from "./song.router";
import { RoleRouter } from "./role.router";
import { AccountRouter } from "./account.route";
import { AuthRouter } from "./auth.route";

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

    app.use(
        `${PATH_ADMIN}/roles`,
        RoleRouter
    ); 

    app.use(
        `${PATH_ADMIN}/accounts`,
        AccountRouter
    ); 

    app.use(
        PATH_ADMIN + '/auth',
        AuthRouter
    );
}

export default adminRouter;

