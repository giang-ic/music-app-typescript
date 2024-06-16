import express, {Express, Response, Request} from "express";
import dotenv from "dotenv";
import {connect} from "./config/database";

dotenv.config(); // enviroment varibales
connect(); // database

// express
const app: Express = express();
const port:(string | number) = process.env.PORT || 3000;

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
    console.log(`Music App listening`);
});