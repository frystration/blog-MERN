import express from "express";
import mongoose from "mongoose";
import cors from "cors"

import {
    commentCreateValidation,
    loginValidation,
    postCreateValidation,
    registerValidation
} from "./validations/validations.js";

import {CommentController, PostController, UserController} from "./controllers/index.js";

import multer from "multer"

import {checkAuth, handleValidationErrors} from "./utils/index.js"


mongoose.connect("mongodb+srv://admin:RGiKYOJT6kLii6qC@cluster0.qiahgam.mongodb.net/blog?retryWrites=true&w=majority",)
    .then(() => console.log("DB Ok"))
    .catch((error) => console.log("DB Error", error))

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, callback) => {
        callback(null, "uploads")
    }, filename: (_, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({storage})

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static("uploads"))

app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
app.get("/auth/me", checkAuth, UserController.getMe)

app.post("/upload", checkAuth, upload.single("image"), (request, response) => {
    response.json({
        url: `/uploads/${request.file.originalname}`
    })
})

app.get("/posts/tags", PostController.getLastTags)

app.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.get("/posts", PostController.getAll)
app.get("/posts/tags/:tag", PostController.getAllByTag)
app.get("/posts/popular", PostController.getAllSorted)
app.get("/posts/:id", PostController.getOne)
app.delete("/posts/:id", checkAuth, PostController.remove)
app.patch("/posts/:id", checkAuth, postCreateValidation, handleValidationErrors, PostController.update)

app.post("/posts/:id/comments", checkAuth, commentCreateValidation, handleValidationErrors, CommentController.create)
app.get("/posts/:id/comments", CommentController.getCommentsByPostId)
app.get("/comments", CommentController.getLastComments)


app.listen(4444, (error) => {
    if (error) {
        return console.log(error)
    }
    console.log("Server Ok")
})