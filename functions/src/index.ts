import express from "express";
import {router} from "./router";
import functions = require("firebase-functions");

const app = express();

app.use(express.json());
app.use(router);

export const api = functions.https.onRequest(app);


