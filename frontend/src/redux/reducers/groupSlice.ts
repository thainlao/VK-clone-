import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IGroup, IUser } from "../../types/types";
import axios from '../../utils/axios';

interface GroupData {
    name: string;
    description: string;
}

interface GInitialState {
    groups: IGroup[],
    members: IUser[],
    posts: any[]
    group: null | IGroup;
    avatar: string | null,
    thema: string | null
    isLoading: Boolean;
}

const initialState: GInitialState = {
    groups: [],
    group: null,
    members: [],
    isLoading: false,
    posts: [],
    avatar: null,
    thema: null,
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
   async ({groupId}) => {
    try {
      const { data } = await axios.post('/groups/join', { groupId});
      return data;
    } catch (error) {
      console.log(error);
    }
  });
  
  export const leaveGroup = createAsyncThunk('group/LeaveGroup', 
  async ({groupId}) => {
    try {
      const { data } = await axios.post('/groups/leave', {groupId});
      return data;
    } catch (error) {
      console.log(error);
    }
  });

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(createGroup.fulfilled, (state, action: any) => {
        state.groups.push(action.payload)
      });
        builder.addCase(getAllGroups.fulfilled, (state, action) => {
            state.groups = action.payload; 
          });

        //id
        builder.addCase(getGroupById.pending, (state, action) => {
          state.isLoading = true
        });
        builder.addCase(getGroupById.fulfilled, (state, action) => {
          state.group = action.payload
          state.isLoading = false
        });
        builder.addCase(getGroupById.rejected, (state, action) => {
          state.isLoading = false
        });

        //avatar
        builder.addCase(uploadAvatarforGroup.pending, (state, action) => {
          state.isLoading = true
        });
        builder.addCase(uploadAvatarforGroup.fulfilled, (state, action) => {
          state.avatar = action.payload
          state.isLoading = false
        });
        builder.addCase(uploadAvatarforGroup.rejected, (state, action) => {
          state.isLoading = false
        });

        //joingroup
        builder.addCase(joinGroup.pending, (state, action) => {
          state.isLoading = true
        });
        builder.addCase(joinGroup.fulfilled, (state, action) => {
            state.group?.members.push(action.payload.userId)
            state.isLoading = false
        });
        builder.addCase(joinGroup.rejected, (state, action) => {
          state.isLoading = false
        });
        
        //leavegroup
        builder.addCase(leaveGroup.pending, (state, action) => {
          state.isLoading = true
        });
        builder.addCase(leaveGroup.fulfilled, (state, action) => {
          if (state.group) {
            state.group.members = state.group.members.filter(memberId => memberId !== action.payload.userId);
          }
          state.isLoading = false
        });
        builder.addCase(leaveGroup.rejected, (state, action) => {
          state.isLoading = false
        });
    },
  });
  
  export default groupSlice.reducer;
