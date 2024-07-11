import { Router } from "express";

// create instance router
const router: Router = Router();

// controller
import * as controller from '../../controllers/admin/topic.controller' ;

// use
router.get('/', controller.index);

router.patch(
    '/change-status/:status/:topicID',
    controller.changeStatus
);

router.patch(
    '/change-multi',
    controller.changeMulti
);

router.patch(
    '/delete-soft/:topicID',
    controller.deleteSoft
)

router.get(
    '/trash',
    controller.trashUI
);

// export
export const TopicRouter: Router = router;
