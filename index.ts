import express, {Express} from "express";
import dotenv from "dotenv";
import {connect} from "./config/database";
import clientRouter from "./routes/client/index.route";

import flash from "express-flash";
import cookieParser from "cookie-parser";
import session  from "express-session";
import methodOverride  from "method-override";

import bodyParser from "body-parser";

dotenv.config(); // enviroment varibales
connect(); // database

// express
const app: Express = express();
const port:(string | number) = process.env.PORT || 3000;

app.use(methodOverride('_method')); //method-override
app.use(express.static('public')); // static files

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// express-flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// template engines
app.set('views', './views');
app.set('view engine', 'pug');

clientRouter(app); // client router

// listen port
app.listen(port, () => {
    console.log(`Music App listening`);
});