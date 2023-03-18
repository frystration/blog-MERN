import PostModel from "../models/Post.js";


export const getLastTags = async (request, response) => {
    try {
        const posts = await PostModel.find().limit(5).exec()
        const tags = posts.map(object => object.tags).flat().slice(0, 5)

        response.json(tags)
    } catch (error) {

    }
}

export const getAll = async (request, response) => {
    try {
        const posts = await PostModel.find().populate("user").exec()

        response.json(posts)
    } catch (error) {
        response.status(500).json({
            message: "Не удалось получить статьи"
        })
    }
}

export const getOne = async (request, response) => {
    try {
        const postId = request.params.id
        PostModel.findOneAndUpdate({
            _id: postId
        }, {
            $inc: {viewsCount: 1}
        }, {
            returnDocument: "after"
        }, (error, document) => {
            if (error) {
                return response.status(500).json({
                    message: "Не удалось получить статью"
                })
            }
            if (!document) {
                return response.status(404).json({
                    message: "Статья не найдена"
                })
            }

            response.json(document)
        }).populate("user")
    } catch (error) {
        response.status(500).json({
            message: "Не удалось получить статью"
        })
    }
}

export const remove = async (request, response) => {
    try {
        const postId = request.params.id

        PostModel.findOneAndDelete({
            _id: postId,
        }, (error, document) => {
            if (error) {
                return response.status(500).json({
                    message: "Не удалось удалить статью"
                })
            }
            if (!document) {
                return response.status(404).json({
                    message: "Статья не найдена"
                })
            }

            response.json({
                success: true
            })
        })

    } catch (error) {
        response.status(500).json({
            message: "Не удалось получить статью"
        })
    }
}

export const update = async (request, response) => {
    try {
        const postId = request.params.id

        await PostModel.updateOne({
            _id: postId,
        }, {
            title: request.body.title,
            text: request.body.text,
            imageUrl: request.body.imageUrl,
            user: request.userId,
            tags: request.body.tags.split(",")
        })

        response.json({
            success: true
        })

    } catch (error) {
        response.status(500).json({
            message: "Не удалось обновить статью"
        })
    }
}

export const create = async (request, response) => {
    try {
        const document = new PostModel({
            title: request.body.title,
            text: request.body.text,
            imageUrl: request.body.imageUrl,
            tags: request.body.tags.split(","),
            user: request.userId
        })

        const post = await document.save()

        response.json(post)
    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Не удалось сохдать статью"
        })
    }
}


