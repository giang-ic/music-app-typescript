import { Router } from "express";
import multer from "multer";
const upload = multer();

// middlware
import * as cloudMiddlware  from "../../middleware/admin/uploadCloudinary.middlware";

// create instance Router
const router: Router = Router();

// controller
import * as controller from "../../controllers/admin/account.controller";

// use
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
    upload.single('avatar'),
    cloudMiddlware.uploadSingle,
    // valiate
    controller.create
);

router.get(
    '/edit/:accountID',
    controller.editUI
);

router.patch(
    '/edit/:accountID',
    upload.single('avatar'),
    cloudMiddlware.uploadSingle,
    // validate
    controller.edit
);
// export 
export const AccountRouter: Router = router;