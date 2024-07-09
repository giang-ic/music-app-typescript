import {Router, Express}  from "express";
import { systemConfig } from "../../config/system";
import { DashboardRouter } from "./dashboard.router";
import { TopicRouter } from "./topics.route";
import { SongRouter } from "./song.router";
import { RoleRouter } from "./role.router";
import { AccountRouter } from "./account.route";
import { AuthRouter } from "./auth.route";
import { requireAuth } from "../../middleware/admin/auth.middlware";
import * as dashboardController from "../../controllers/admin/dashboard.controller";
import { SingerRouter } from "./singer.router";

const adminRouter = (app: Express): void => {
    const PATH_ADMIN = systemConfig.prefix_admin;

    app.get(
        PATH_ADMIN + '/',
        requireAuth,
        dashboardController.index
    );

    app.use(
        `${PATH_ADMIN}/dashboard`,
        requireAuth,
        DashboardRouter
    );

    app.use(
        `${PATH_ADMIN}/topics`,
        requireAuth,
        TopicRouter
    );    

    app.use(
        `${PATH_ADMIN}/songs`,
        requireAuth,
        SongRouter
    );    

    app.use(
        `${PATH_ADMIN}/roles`,
        requireAuth,
        RoleRouter
    ); 

    app.use(
        `${PATH_ADMIN}/accounts`,
        requireAuth,
        AccountRouter
    ); 

    app.use(
        PATH_ADMIN + '/singers',
        requireAuth,
        SingerRouter
    );

    app.use(
        PATH_ADMIN + '/auth',
        AuthRouter
    );

}

export default adminRouter;

