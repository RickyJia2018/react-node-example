import { Router } from "express";
import { getCardList } from "../controllers/cardController";

const cardRoutes: Router = Router();

cardRoutes.get('/search', getCardList);

export default cardRoutes;