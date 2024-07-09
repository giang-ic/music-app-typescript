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

// export
export const SingerRouter: Router = router;

