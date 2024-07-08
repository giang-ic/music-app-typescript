import { Router } from "express";

// create instance router 
const router = Router();

// controller
import * as controller from "../../controllers/admin/role.controller";

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
    // validate
    controller.create
);

router.get(
    '/permissions',
    controller.permissionsUI
);
// export
export const RoleRouter: Router = router;