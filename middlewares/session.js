import session from "express-session"

const MongoStore = require("connect-mongo")(session)

export default session({
    secret: "hustmaths",
    name: "manage",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 6 * 1000
    },
    rolling: true,
    store: new MongoStore({
        url: "mongodb://localhost:27017/manage",
        touchAfter: 60 * 60 * 24
    })
})