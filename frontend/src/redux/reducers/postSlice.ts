import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../utils/axios';
import { PostState } from "../../types/types";

const initialState: PostState = {
    posts: [],
    popularPosts: [],
    isLoading: false,
}

export const createPost = createAsyncThunk('/post/createPost', async (params) => {
    try {
       const {data} =  await axios.post('/posts', params)
       return data
    } catch (e) {
        console.log(e)
    }
})

export const getAllPost = createAsyncThunk('/post/getAllPosts', async () => {
  try {
    const {data} = await axios.get('/posts')
    return data
  } catch (e) {
    console.log(e)
  }
})

export const likePost = createAsyncThunk('post/likePost', async (postId: string) => {
  try {
    const { data } = await axios.post(`/posts/${postId}/like`);
    return { postId, likes: data.likes };
  } catch (e) {
    console.log(e);
  }
});

export const removePost = createAsyncThunk('post/removePost', async (id: any) => {
  try {
    const {data} = await axios.delete(`/posts/${id}`, id)
    return data
  } catch (e) {
    console.log(e);
  }
});

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //Создание
        builder.addCase(createPost.pending, (state) => {
            state.isLoading = true
          });
          builder.addCase(createPost.fulfilled, (state, action) => {
            state.isLoading = false
            state.posts.push(action.payload)
          });
          builder.addCase(createPost.rejected, (state) => {
            state.isLoading = false
          });

          //получение поста
          builder.addCase(getAllPost.pending, (state) => {
            state.isLoading = true
          });

          builder.addCase(getAllPost.fulfilled, (state, action) => {
            state.isLoading = false
            state.posts = action.payload.posts
            state.popularPosts = action.payload.popularPosts
          });

          builder.addCase(getAllPost.rejected, (state) => {
            state.isLoading = false
          });

          //like
          builder.addCase(likePost.pending, (state) => {
            state.isLoading = true
          });

          builder.addCase(likePost.fulfilled, (state, action: any) => {
            const { postId, likes } = action.payload;
            const post = state.posts.find((p) => p._id === postId);
      
            if (post) {
              post.likes = likes;
            }
          });
          builder.addCase(likePost.rejected, (state) => {
            state.isLoading = false
          });

          //удаление
          builder.addCase(removePost.pending, (state) => {
            state.isLoading = true
          });

          builder.addCase(removePost.fulfilled, (state, action) => {
            state.isLoading = false
            state.posts = state.posts.filter((post) => post._id !== action.payload._id,)
          });

          builder.addCase(removePost.rejected, (state) => {
            state.isLoading = false
          });
    },
})

export default postSlice.reducer