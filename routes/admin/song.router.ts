import {Router} from "express";
import multer from "multer";
import { diskStorageHelper } from "../../helper/diskStorage.helper";
// const upload = multer({ dest: '/uploads' }); /** test */
// const upload = multer({ storage: diskStorageHelper() }) /**disk storage */

// create instance router
const router: Router = Router();

// controller
import * as controller from "../../controllers/admin/song.controller";

// middlware
import * as cloudMiddlware  from "../../middleware/admin/uploadCloudinary.middlware";
const upload = multer();

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
    upload.fields(
        [
            {name: 'avatar', maxCount: 1},
            {name: 'audio', maxCount: 1}
        ]
    ),
    cloudMiddlware.uploadFields,
    controller.create
);

// export
export const SongRouter: Router = router;