//import express from "express";
const router = require("express").Router();
import booksController from "../controllers/booksController";
import authenticate from "../middlewares/authenticate";

router.use(authenticate);
router.get("/", booksController.getBookList);
router.post("/", booksController.createNewBook);
router.get("/search", booksController.searchBook);
router.get("/fetchPages", booksController.fetchPages);

//export default router;
module.exports = router;
