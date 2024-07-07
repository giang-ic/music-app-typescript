import {Router} from "express";
import multer from "multer";
// const upload = multer({ dest: '/uploads' }); /** test */
import { diskStorageHelper } from "../../helper/diskStorage.helper";
const upload = multer({ storage: diskStorageHelper() }) /**disk storage */

// create instance router
const router: Router = Router();

// controller
import * as controller from "../../controllers/admin/song.controller";

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
    controller.create
);

// export
export const SongRouter: Router = router;
