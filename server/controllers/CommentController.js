import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";

export const create = async (request, response) => {
    try {
        const postId = request.params.id
        const document = new CommentModel({
            text: request.body.text,
            user: request.userId,
            post: postId
        })

        const comment = await document.save()
        response.json(comment)

    } catch (error) {
        response.status(500).json({
            message: "Не удалось оставить комментарий"
        })
    }
}

export const getCommentsByPostId = async (request, response) => {
    try {
        const postId = request.params.id
        const comments = await CommentModel.find({
            post: postId
        }).populate("user").exec()
        response.json(comments)
    } catch (error) {
        response.status(500).json({
            message: "Не удалось получить комментарии"
        })
    }
}

export const getLastComments = async (request, response) => {
    try {
        const comments = (await CommentModel.find().populate("user").exec()).reverse().slice(0, 2)
        response.json(comments)
    } catch (error) {
        response.status(500).json({
            message: "Не удалось получить комментарии"
        })
    }
}