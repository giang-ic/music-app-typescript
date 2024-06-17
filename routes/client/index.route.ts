import {Express} from "express";

import { topicRouter } from "./topic.route";
import { songRouter } from "./songs.route";
import { userRouter } from "./user.route";

const clientRouter = (app: Express):void => {
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
}

export default clientRouter;