import {Express} from "express";

import { topicRouter } from "./topic.route";

const clientRouter = (app: Express):void => {
    app.use(
        '/topics',
        topicRouter
    );
}

export default clientRouter;