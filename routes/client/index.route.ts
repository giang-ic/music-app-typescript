import {Express} from "express";

import { topicRouter } from "./topic.route";
import { songRouter } from "./songs.route";

const clientRouter = (app: Express):void => {
    app.use(
        '/topics',
        topicRouter
    );

    app.use(
        '/songs',
        songRouter
    );
}

export default clientRouter;