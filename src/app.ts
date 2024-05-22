import express, { Application, Request, Response } from "express";
import cors from "cors";
import routes from "./app/module/routes";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

const getAController = (req: Request, res: Response) => {
  res.send("hellow app");
};

app.get("/", getAController);

export default app;
