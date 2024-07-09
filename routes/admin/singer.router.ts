import { Router } from "express";

// create instance router
const router: Router = Router();

// controller
import * as controller from "../../controllers/admin/singer.controller";

// user
router.get(
    '/',
    controller.index
);

router.get(
    '/create',
    controller.createUI
);

// export
export const SingerRouter: Router = router;

