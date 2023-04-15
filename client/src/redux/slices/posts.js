import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const {data} = await axios.get("/posts");
    return data;
});
export const fetchPostsByTag = createAsyncThunk(
    "posts/fetchPostsByTag",
    async (tag) => {
        const {data} = await axios.get(`/posts/tags/${tag}`);
        return data;
    });

export const fetchPopularPosts = createAsyncThunk("posts/fetchPopularPosts", async () => {
    const {data} = await axios.get("/posts/popular");
    return data;
});

export const fetchPopularPostsByTag = createAsyncThunk("posts/fetchPopularPostsByTag", async (tag) => {
    const {data} = await axios.get(`/posts/popular/tags/${tag}`);
    return data;;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
    const {data} = await axios.get("/posts/tags");
    return data;
});

export const fetchRemovePost = createAsyncThunk(
    "posts/fetchRemovePost",
    async (id) => await axios.delete(`/posts/${id}`)
);

export const fetchLastComments = createAsyncThunk("posts/fetchLastComments", async () => {
    const {data} = await axios.get("/comments");
    return data;
});

const initialState = {
    posts: {
        items: [],
        status: "loading",
    },
    tags: {
        items: [],
        status: "loading",
    },
    comments: {
        items: [],
        status: "loading",
    },
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: {
        // Получение статей
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = "loading";
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = "loaded";
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = "error";
        },
        // Получение статей по тегу
        [fetchPostsByTag.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = "loading";
        },
        [fetchPostsByTag.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = "loaded";
        },
        [fetchPostsByTag.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = "error";
        },
        // Получение популярных статей по тегу
        [fetchPopularPostsByTag.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = "loading";
        },
        [fetchPopularPostsByTag.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = "loaded";
        },
        [fetchPopularPostsByTag.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = "error";
        },
        // Получение популярных статей статей
        [fetchPopularPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = "loading";
        },
        [fetchPopularPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = "loaded";
        },
        [fetchPopularPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = "error";
        },
        // Получение тегов
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = "loading";
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = "loaded";
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = "error";
        },
        // Получение последних комментов
        [fetchLastComments.pending]: (state) => {
            state.comments.items = [];
            state.comments.status = "loading";
        },
        [fetchLastComments.fulfilled]: (state, action) => {
            state.comments.items = action.payload;
            state.comments.status = "loaded";
        },
        [fetchLastComments.rejected]: (state) => {
            state.comments.items = [];
            state.comments.status = "error";
        },
        // Удаление статьи
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(
                (object) => object._id !== action.meta.arg
            );
        },
    },
});

export const postsReduce = postsSlice.reducer;
