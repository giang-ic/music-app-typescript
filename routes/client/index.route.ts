import {Express} from "express";

import { topicRouter } from "./topic.route";
import { songRouter } from "./songs.route";
import { userRouter } from "./user.route";
import { searchRouter } from "./search.route";

// middleware
import * as middlewareUser from "../../middleware/client/user.middleware";
import * as middlewareSetting from "../../middleware/client/settings.middleware";

const clientRouter = (app: Express):void => {

    // checking wheter the user is logged in or not
    app.use(middlewareUser.accessLogin);

    // setting general for website
    app.use(middlewareSetting.settingGeneral);
    
    app.use(
        '/topics',
        topicRouter
    );

    app.use(
        '/songs',
        songRouter
    );

    app.use(
        '/user',
        userRouter
    );

    app.use(
        '/search',
        searchRouter
    );
}

export default clientRouter;