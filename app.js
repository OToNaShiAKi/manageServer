import express from "express";
import {
  join
} from "path";

const app = express();

import cors from "./middlewares/cors";
app.use(cors);

import './middlewares/mongo'
import session from './middlewares/session'
app.use(session);

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(join(__dirname, "public")));

import admin from './middlewares/admin'
app.use(admin);

import adminRouter from "./routes/admin";
app.use("/admin", adminRouter);

import listRouter from "./routes/list";
app.use("/list", listRouter);

import {
  notFound,
  error
} from './middlewares/error'
app.use(notFound);
app.use(error);

module.exports = app;