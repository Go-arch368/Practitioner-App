import { createAsyncThunk,createSlice,PayloadAction } from "@reduxjs/toolkit";
import Group from "../components/model/Group"
import GroupService from "@/services/GroupService";
import { ReducerStates } from "./ReducerStates";
import AppError from "@/components/model/AppError";
import axios from "axios";
import { Elsie_Swash_Caps } from "next/font/google";
const errorObj : AppError = {
    errorStatus:0,
    message:""
}

export interface GroupsState {
  groups: Group[];
  status: ReducerStates;
  error: AppError;
  groupRepricingType: string;
  shouldFetch: boolean;
}



const initialState: GroupsState = {
  groups: [],
  status: ReducerStates.idle,
  error: errorObj,
  groupRepricingType: '',
  shouldFetch: true,
};

type GroupRequest = Partial<Group>&{
  limit?:string,
  page?:string
}

export const fetchGroups = createAsyncThunk<Group[], GroupRequest, { rejectValue: AppError }>(
  'groups/fetchGroups',
  async (groupRequest, { rejectWithValue }) => {
    try {
      const response = await GroupService.searchGroup<Group[],GroupRequest>(groupRequest);
      if(response.status!==200){
        return rejectWithValue({
          errorStatus:response.status,
          message:
              (response.data as { message?: string })?.message ||
            "Failed to fetch facilities",
        })
      }
      return response.data
    } catch (e) {
      if(axios.isAxiosError(e)){
        const err : AppError = {
          errorStatus : e.response?.status||500,
          message:(e.response?.data as {message?:string})?.message || e.message || "unknown error"
        }
        return rejectWithValue(err)
      }else if (e instanceof Error){
        return rejectWithValue({errorStatus:500,message:e.message});
        }
       else{
        return rejectWithValue({errorStatus:500,message:"Unknown error"})
       }
      }
    }
);

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    resetGroupStatus: (state) => {
      state.status = ReducerStates.idle;
    },
    resetGroupRepricingType: (state) => {
      state.groupRepricingType = '';
    },
    setGroupRepricingType: (state, action: PayloadAction<string>) => {
      state.groupRepricingType = action.payload;
    },
    resetGroups: () => initialState,
    resetGroupsShouldFetch: (state) => {
      state.shouldFetch = false;
    },
    setGroupsShouldFetch: (state) => {
      state.shouldFetch = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.status = ReducerStates.loading;
      })
      .addCase(fetchGroups.fulfilled, (state, action: PayloadAction<Group[]>) => {
        state.status = ReducerStates.succeeded;
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.status = ReducerStates.failed;
        state.error = action.payload as AppError;
      });
  },
});

export const {
  resetGroupStatus,
  resetGroupRepricingType,
  setGroupRepricingType,
  resetGroups,
  resetGroupsShouldFetch,
  setGroupsShouldFetch,
} = groupsSlice.actions;

export default groupsSlice.reducer;