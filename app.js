    const express = require("express"); 
    const mongoose = require("mongoose");
    const path = require("path");
    const bodyParser = require("body-parser");
    const cookieParser = require("cookie-parser");
    const session = require("express-session"); 
    const flash = require("connect-flash");

    let routes = require("./routes");

    const app = express();

    mongoose.connect("mongodb://0.0.0.0:27017");

    app.set("port", process.env.PORT || 3000);

    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "ejs");

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(session({
        secret: "TKR", 
        "resave": true, 
        "saveUninitialized": true
    }));
    app.use(flash());

    app.use(routes);

    let appPort = app.get("port");
    app.listen(appPort, () => console.log(`Server started on port ${appPort}`));