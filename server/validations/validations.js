import  {body} from "express-validator"

export const loginValidation = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Пароль должен быть минимум 8 символов").isLength({min : 8})
]

export const registerValidation = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Пароль должен быть минимум 8 символов").isLength({min : 8}),
    body('fullName', "Укажите имя").isLength({min : 3}),
    body('avatarUrl', "Неверня ссылка на аватар").optional().isURL(),
]
export const postCreateValidation = [
    body('title', "Введите заголовок статьи").isLength({min : 1}).isString(),
    body('text', "Введите текст статьи").isLength({min : 1}).isString(),
    body('tags', "Неверный формат тегов").optional().isString(),
    body('imageUrl', "huiНеверня ссылка на изображение").optional().isString()
]
export const commentCreateValidation = [
    body('text', "Введите текст комментария").isLength({min : 1}).isString()
]