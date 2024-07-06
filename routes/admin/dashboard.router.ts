import { Router } from "express";

// create instance router
const router: Router = Router();

// controller
import * as controller from "../../controllers/admin/dashboard.controller";

// user
router.get(
    '/',
    controller.index
);

// export
export const DashboardRouter: Router = router;

