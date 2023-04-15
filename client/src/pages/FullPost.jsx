import React, {useEffect, useState} from "react";

import {CommentsBlock, Index, Post} from "../components";
import {useParams} from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from "react-markdown";
import {useSelector} from "react-redux";
import {isAuthSelector} from "../redux/slices/auth";

export const FullPost = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();
    const [isCommentsLoading, setIsCommentsLoading] = useState(true)
    const [comments, setComments] = useState()
    const isAuth = useSelector(isAuthSelector);

    const sendComment = (value) => {
        axios
            .post(`/posts/${id}/comments`, {
                "text": value
            })
            .then((response) => {
            }).catch((error) => {
            console.warn(error);
            alert("Ошибка при оставлении комментария");
        })
    }

    useEffect(() => {
        axios
            .get(`/posts/${id}`)
            .then((response) => {
                setData(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.warn(error);
                alert("Ошибка при получении статьи");
            });


    }, [id]);

    useEffect(() => {
        axios
            .get(`/posts/${id}/comments`)
            .then((response) => {
                setComments(response.data);
                setIsCommentsLoading(false);
            }).catch((error) => {
            console.warn(error);
            alert("Ошибка при получении комментариев");
        });

    }, [id, sendComment]);


    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost/>;
    }

    return (
        <>
            <Post
                id={data._id}
                title={data.title}
                imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
                user={data.user}
                createdAt={data.createdAt}
                viewsCount={data.viewsCount}
                commentsCount={3}
                tags={data.tags}
                isFullPost
            >
                <ReactMarkdown children={data.text}/>
            </Post>
            <CommentsBlock
                items={comments}
                isLoading={isCommentsLoading}
            >
                {isAuth &&
                    <Index sendComment={sendComment}/>
                }
            </CommentsBlock>
        </>
    );
};
