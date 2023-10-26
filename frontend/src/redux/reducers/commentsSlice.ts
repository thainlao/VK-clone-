import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateCommentParams, IComments } from "../../types/types";
import axios from '../../utils/axios';

const initialState: IComments = {
    comments: [],
    loading: false,
    user: null,
}

export const createComment = createAsyncThunk('/comment/CreateComment',
 async ({postId, comment, userId}: CreateCommentParams) => {
    try {
        const {data} = await axios.post(`/comments/${postId}`, {
            postId, comment, userId
        })
        return data
    } catch (e) {
        console.log(e)
    }
 })


export const getAllComments = createAsyncThunk('/comment/getAllComments',
  async (postId) => {
    try {
      const {data} = await axios.get(`/posts/comments/${postId}`, {
        params: {includeUser: true }
      })
      return data
    } catch (e) {
      console.log(e)
    }
  })

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //Создание
        builder.addCase(createComment.pending, (state) => {
            state.loading = true
          });
          builder.addCase(createComment.fulfilled, (state, action) => {
            state.loading = false
            state.comments.push(action.payload)
          });
          builder.addCase(createComment.rejected, (state) => {
            state.loading = false
          });

        //Получение
        builder.addCase(getAllComments.pending, (state) => {
          state.loading = true
        });
        builder.addCase(getAllComments.fulfilled, (state, action) => {
          state.loading = false
          state.comments = action.payload
          state.user = action.payload
        });
        builder.addCase(getAllComments.rejected, (state) => {
          state.loading = false
        });

  }
})

export default commentSlice.reducer
