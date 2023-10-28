import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IGroup, IUser } from "../../types/types";
import axios from '../../utils/axios';


interface GInitialState {
    groups: IGroup[],
    members: IUser[],
    posts: any[]
    avatar: string | null,
    isLoading: Boolean;
}

const initialState: GInitialState = {
    groups: [],
    members: [],
    isLoading: false,
    posts: [],
    avatar: null,
}

export const createGroup = createAsyncThunk('group/CreateGroup', 
async (params) => {
    try {
        const { data } = await axios.post('/groups/create', params)
        return data
    } catch (e) {
        console.log(e)
    }
})

export const getAllGroups = createAsyncThunk('/group/getAllgroups', async () => {
    try {
      const {data} = await axios.get('/groups/getgroups')
      return data;
    } catch (e) {
      console.log(e)
    }
  })

  export const getGroupById = createAsyncThunk('group/getgroupById', async (groupId) => {
    try {
      const { data } = await axios.get(`/groups/getgroup/${groupId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  });

  export const uploadAvatarforGroup = createAsyncThunk(
    'group/GroupImg',
    async (params) => {
      try {
        const { data } = await axios.post('/groups/groupimg', params)
        return data
      } catch (e) {
        console.log(e)
      }
  })

  export const joinGroup = createAsyncThunk('group/JoinGroup',
  async (groupId) => {
    try {
      const { data } = await axios.post(`/groups/${groupId}/join`)
      return data
    } catch (e) {
      console.log(e)
    }
  });
  
  export const leaveGroup = createAsyncThunk('group/LeaveGroup', 
  async (groupId) => {
    try {
      const { data } = await axios.post(`/groups/${groupId}/leave`)
      return data
    } catch (e) {
      console.log(e)
    }
  });

  export const removeGrop = createAsyncThunk('group/removeGroup', async (id: any) => {
    try {
      const {data} = await axios.delete(`/groups/${id}`, id)
      return data
    } catch (e) {
      console.log(e);
    }
  });

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      //create
        builder.addCase(createGroup.fulfilled, (state, action: any) => {
          state.groups.push(action.payload)
        });
        builder.addCase(getAllGroups.fulfilled, (state, action) => {
            state.groups = action.payload; 
          });

        //id
        builder.addCase(getGroupById.pending, (state) => {
          state.isLoading = true
        });
        builder.addCase(getGroupById.fulfilled, (state, action) => {
          state.group = action.payload
          state.isLoading = false
        });
        builder.addCase(getGroupById.rejected, (state) => {
          state.isLoading = false
        });

        //avatar
        builder.addCase(uploadAvatarforGroup.pending, (state) => {
          state.isLoading = true
        });
        builder.addCase(uploadAvatarforGroup.fulfilled, (state, action) => {
          state.avatar = action.payload
          state.isLoading = false
        });
        builder.addCase(uploadAvatarforGroup.rejected, (state) => {
          state.isLoading = false
        });

        //joingroup
        builder.addCase(joinGroup.pending, (state) => {
          state.isLoading = true
        });
        builder.addCase(joinGroup.fulfilled, (state, action) => {
          const groupToUpdate = state.groups.find(group => group._id === action.payload.groupId);

          if (groupToUpdate) {
            groupToUpdate.members.push(action.payload.userId);
          }
            state.isLoading = false
        });
        builder.addCase(joinGroup.rejected, (state) => {
          state.isLoading = false
        });
        
        //leavegroup
        builder.addCase(leaveGroup.pending, (state) => {
          state.isLoading = true
        });
        builder.addCase(leaveGroup.fulfilled, (state, action) => {
          const groupToUpdate = state.groups.find(group => group._id === action.payload.groupId);
          if (groupToUpdate) {
            groupToUpdate.members = groupToUpdate.members.filter(memberId => memberId !== action.payload.userId);
          }
          state.isLoading = false
        });
        builder.addCase(leaveGroup.rejected, (state) => {
          state.isLoading = false
        });

          //удаление
          builder.addCase(removeGrop.pending, (state) => {
            state.isLoading = true
          });

          builder.addCase(removeGrop.fulfilled, (state, action) => {
            state.isLoading = false
            state.groups = state.groups.filter((group) => group._id !== action.payload._id,)
          });

          builder.addCase(removeGrop.rejected, (state) => {
            state.isLoading = false
          });
    },
  });
  
  export default groupSlice.reducer;
