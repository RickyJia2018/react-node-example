import { Router } from "express";
import cardRoutes from "./cards";

const rootRouter: Router = Router();

rootRouter.use('/cards', cardRoutes);

export default rootRouter