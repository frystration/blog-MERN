import React, {useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import {CommentsBlock, Post, TagsBlock} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchLastComments,
    fetchPopularPosts,
    fetchPopularPostsByTag,
    fetchPosts,
    fetchPostsByTag,
    fetchTags
} from "../redux/slices/posts";

export const Home = () => {
    const userData = useSelector((state) => state.auth.data);
    const dispatch = useDispatch();
    const {posts, tags, comments} = useSelector((state) => state.posts);
    const [filter, setFilter] = useState(0)
    const [tag, setTag] = useState("")

    const isPostsLoading = posts.status === "loading";
    const isTagsLoading = tags.status === "loading";
    const isCommentsLoading = comments.status === "loading";

    React.useEffect(() => {
        if (filter === 0 && tag === "") {
            dispatch(fetchPosts());
            dispatch(fetchTags());
            dispatch(fetchLastComments());
        }
        if (filter === 1 && tag === "") {
            dispatch(fetchPopularPosts());
            dispatch(fetchTags());
            dispatch(fetchLastComments());
        }
        if (filter === 0 && tag !== "") {
            dispatch(fetchPostsByTag(tag));
            dispatch(fetchTags());
            dispatch(fetchLastComments());
        }
        if (filter === 1 && tag !== "") {
            dispatch(fetchPopularPostsByTag(tag));
            dispatch(fetchTags());
            dispatch(fetchLastComments());
        }
    }, [dispatch, filter, tag]);

    return (
        <>
            <Tabs
                style={{marginBottom: 15}}
                value={filter}
                aria-label="basic tabs example"
            >
                <Tab label="Новые" onClick={() => setFilter(0)}/>
                <Tab label="Популярные" onClick={() => setFilter(1)}/>
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {(isPostsLoading ? [...Array(5)] : posts.items).map((object, index) =>
                        isPostsLoading ? (
                            <Post key={index} isLoading={true}/>
                        ) : (
                            <Post
                                id={object._id}
                                title={object.title}
                                imageUrl={
                                    object.imageUrl
                                        ? `http://localhost:4444${object.imageUrl}`
                                        : ""
                                }
                                user={object.user}
                                createdAt={object.createdAt}
                                viewsCount={object.viewsCount}
                                tags={object.tags}
                                isEditable={userData?._id === object.user._id}
                            />
                        )
                    )}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock tag={tag} setTag={setTag} items={tags.items} isLoading={isTagsLoading}/>
                    <CommentsBlock
                        items={comments.items} isLoading={isCommentsLoading}
                    />
                </Grid>
            </Grid>
        </>
    );
};
