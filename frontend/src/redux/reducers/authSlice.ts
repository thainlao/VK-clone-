import axios from '../../utils/axios';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { AuthState, RegisterUserParams, RegisterUserResponse } from '../../types/types';

const initialState: AuthState = {
    user: null,
    users: [],
    token: null,
    isLoading: false,
    status: null,
    avatar: null,
    name: null,
    surname: null,
}

export const registerUser = createAsyncThunk<RegisterUserResponse, RegisterUserParams>(
    'auth/registerUser', 
    async ({username, password, name, surname}) => {
    try {
        const { data } = await axios.post('/auth/register', {
            username, password, name, surname
        })
        if (data.token) {
            window.localStorage.setItem('token', data.token)
        }
        return data
    } catch (e: any) {
        console.log(e)
    }
})

export const uploadAvatar = createAsyncThunk(
  'auth/uploadAvatar',
  async (params) => {
    try {
      const { data } = await axios.post('/auth/changeimg', params)
      return data
    } catch (e) {
      console.log(e)
    }
})

export const loginUser = createAsyncThunk<RegisterUserResponse, RegisterUserParams>(
  'auth/loginUser', 
  async ({username, password}) => {
  try {
      const { data } = await axios.post('/auth/login', {
          username, password,
      })
      if (data.token) {
          window.localStorage.setItem('token', data.token)
      }
      return data
  } catch (e: any) {
      console.log(e)
  }
})

export const getUserById = createAsyncThunk('auth/getUserById', async (userId) => {
  try {
    const { data } = await axios.get(`/auth/getuser/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getMe = createAsyncThunk(
  'auth/loginUse', async () => {
  try {
      const { data } = await axios.get('/auth/me')
      return data
  } catch (e: any) {
      console.log(e)
  }
})

export const getAllUsers = createAsyncThunk(
  'auth/GetUsers', async () => {
    try {
      const { data } = await axios.get('/auth/getusers')
      return data
    } catch (e) {
      console.log(e)
    }
  }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        state.user =  null
        state.token = null
        state.isLoading = false
        state.status = null
      }
    },
    extraReducers: (builder) => {
      //Register
        builder.addCase(registerUser.pending, (state) => {
          state.isLoading = true;
          state.status = null
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.status = action.payload.message
          state.user = action.payload.user
          state.token = action.payload.token
          state.surname = action.payload.surname
          state.name = action.payload.name
        });
        builder.addCase(registerUser.rejected, (state, action) => {
          state.isLoading = false;
          state.status = action.error.message || 'Произошла ошибка.';
        });

        //Login
        builder.addCase(loginUser.pending, (state) => {
          state.isLoading = true;
          state.status = null
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.status = action.payload.message
          state.user = action.payload.user
          state.token = action.payload.token
        });
        builder.addCase(loginUser.rejected, (state, action) => {
          state.isLoading = false;
          state.status = action.error.message || 'Произошла ошибка.';
        });

        //getMe
        builder.addCase(getMe.pending, (state) => {
          state.isLoading = true;
          state.status = null
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
          state.isLoading = false
          state.status = null
          state.user = action.payload?.user
          state.token = action.payload?.token
        });
        builder.addCase(getMe.rejected, (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.status = action.payload.message
        });

        //getAll
        builder.addCase(getAllUsers.pending, (state) => {
          state.isLoading = true;
        });
        
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
          state.isLoading = false;
          state.users = action.payload; // Assuming that the payload contains the list of users.
        });
        
        builder.addCase(getAllUsers.rejected, (state, action) => {
          state.isLoading = false;
          state.status = action.error.message || 'Произошла ошибка.';
        });

        //getUserById
        builder.addCase(getUserById.pending, (state) => {
          state.isLoading = true;
        });
        
        builder.addCase(getUserById.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload // Assuming that the payload contains the list of users.
        });
        
        builder.addCase(getUserById.rejected, (state) => {
          state.isLoading = false;
        });


        //img 
        builder.addCase(uploadAvatar.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(uploadAvatar.fulfilled, (state, action) => {
          state.isLoading = false;
          state.avatar = action.payload
        });
        builder.addCase(uploadAvatar.rejected, (state) => {
          state.isLoading = false;
        });
    } 
});

export const checkIsAuth = (state: AuthState) => Boolean(state.token);
export const {logout} = authSlice.actions
export default authSlice.reducer