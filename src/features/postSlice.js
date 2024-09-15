import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [
        {
            title: "QuickBlog",
            content: "Welcome to QuickBlog. QuickBlog is an Blogging Platform. You can create, update, delete posts. You can also search posts.",
            image: "https://via.placeholder.com/300x400?text=QUICKBLOG",
            status: "active",
            userID: "1",
            slug: "/",
        },
    ]
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        createPostStore: (state, action) => {
            state.posts.push(action.payload);
        },
        updatePostStore: (state, action) => {
            state.posts = state.posts.map((post) => post.slug === action.payload.slug ? action.payload : post)
        },

        deletePostStore: (state, action) => {
            state.posts = state.posts.filter((post) => post.slug !== action.payload.slug)
        },
    }
})

export const { createPostStore, updatePostStore, deletePostStore } = postSlice.actions;
export default postSlice.reducer