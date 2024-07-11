import { Router } from "express";
import multer from "multer";
const upload = multer();

// create instance router
const router: Router = Router();

// controller
import * as controller from '../../controllers/admin/topic.controller' ;

// middlware
import * as cloudMiddlware  from "../../middleware/admin/uploadCloudinary.middlware";

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

router.patch(
    '/restore/:topicID',
    controller.restore
);

router.get(
    '/create',
    controller.createUI
);
router.post(
    '/create',
    upload.single('avatar'),
    cloudMiddlware.uploadSingle,
    // validate
    controller.create
);

// export
export const TopicRouter: Router = router;
