import Express from "express";
import router from '../router/index.js';

const express = Express();
const port = 3000;

express.set('view engine', 'ejs');
express.use("/public", Express.static("./assets"));
express.use(Express.urlencoded({ extended: true }));

express.use("/", router)

export { express, port }