import { Router } from "express";
import multer from "multer";
const upload = multer();

// create instance router
const router: Router = Router();

// controller
import * as controller from "../../controllers/admin/settings.controller";

// middlware
import * as cloudMiddlware  from "../../middleware/admin/uploadCloudinary.middlware";

// use
router.get(
    '/general',
    controller.generalUI
);

router.patch(
    '/general',
    upload.single('logo'),
    cloudMiddlware.uploadSingle,
    controller.general
);

// export
export const SettingGeneralRouter: Router = router;