import {Router} from "express";

// create instance router
const router: Router = Router();

// controller
import * as controller from "../../controllers/client/topic.controller";

router.get(
    '/',
    controller.index
);

export const topicRouter: Router = router;
