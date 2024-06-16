import express, {Express, Response, Request} from "express";

const app: Express = express();

const port:(string | number) = 3000;

app.get(
    '/topics', 
    (req: Request, res: Response):void => {
        console.log("music app topics");
        res.send("TOPICS");
    }
);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});