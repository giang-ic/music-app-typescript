import express, {Express, Response, Request} from "express";

const app: Express = express();

const port:(string | number) = 3000;

// template engines
app.set('views', './views');
app.set('view engine', 'pug');

// router
app.get(
    '/topics', 
    (req: Request, res: Response):void => {
        console.log("music app topics");
        res.send("TOPICS");
    }
);

// listen port
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});