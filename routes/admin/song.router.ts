import {Router} from "express";

// create instance router
const router: Router = Router();

// controller
import * as controller from "../../controllers/admin/song.controller";

router.get(
    '/',
    controller.index
);

export const SongRouter: Router = router;
