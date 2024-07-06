import { Router } from "express";

// create instance router
const router: Router = Router();

// controller
import * as controller from '../../controllers/admin/topic.controller' ;

// use
router.get('/', controller.index);

// export
export const TopicRouter: Router = router;
