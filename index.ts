import express, {Express} from "express";
import dotenv from "dotenv";
import {connect} from "./config/database";
import clientRouter from "./routes/client/index.route";

dotenv.config(); // enviroment varibales
connect(); // database

// express
const app: Express = express();
const port:(string | number) = process.env.PORT || 3000;

// template engines
app.set('views', './views');
app.set('view engine', 'pug');

clientRouter(app); // client router

// listen port
app.listen(port, () => {
    console.log(`Music App listening`);
});