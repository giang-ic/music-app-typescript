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

// export
export const RoleRouter: Router = router;