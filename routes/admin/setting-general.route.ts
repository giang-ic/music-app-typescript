import { Router } from "express";

// create instance router
const router: Router = Router();

// controller
import * as controller from "../../controllers/admin/settings.controller";

// use
router.get(
    '/general',
    controller.generalUI
);

// export
export const SettingGeneralRouter: Router = router;