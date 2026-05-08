import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (_, res) => res.json({ title: "Sign Up" }));
authRouter.post("/sign-in", (_, res) => res.json({ title: "Sign In" }));
authRouter.post("/sign-out", (_, res) => res.json({ title: "Sign Out" }));

export default authRouter;
