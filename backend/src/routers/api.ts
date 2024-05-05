import { Router } from "express";

import { graphLinks } from "../handlers/api";

import { logTime } from "../middleware/debug";

const apiRouter = Router();

apiRouter.get("/graph-links", logTime, graphLinks);

export default apiRouter;
