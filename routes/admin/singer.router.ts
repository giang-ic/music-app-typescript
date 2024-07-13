import { Router } from "express";
import multer from "multer";
const upload = multer();

// create instance router
const router: Router = Router();

// controller
import * as controller from "../../controllers/admin/singer.controller";

// middlware
import * as cloudMiddlware  from "../../middleware/admin/uploadCloudinary.middlware";

// user
router.get(
    '/',
    controller.index
);

router.get(
    '/create',
    controller.createUI
);

router.post(
    '/create',
    upload.single("avatar"),
    cloudMiddlware.uploadSingle,
    controller.create
);

router.get(
    '/edit/:singerID',
    controller.editUI
);

router.patch(
    '/edit/:singerID',
    upload.single("avatar"),
    cloudMiddlware.uploadSingle,
    controller.edit
);

router.patch(
    '/change-status/:status/:singerID',
    controller.changeStatus
);

router.patch(
    '/change-multi',
    controller.changeMulti
);

router.patch(
    '/delete-soft/:singerID',
    controller.deleteSoft
);

router.get(
    '/trash',
    controller.trashUI
);

router.patch(
    '/restore/:singerID',
    controller.restore
);
// export
export const SingerRouter: Router = router;

