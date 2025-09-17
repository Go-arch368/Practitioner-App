import { createAsyncThunk,createSlice,PayloadAction } from "@reduxjs/toolkit";
import Group from "../components/model/Group"
import GroupService from "@/services/GroupService";
import { ReducerStates } from "./ReducerStates";
import AppError from "@/components/model/AppError";

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

export interface GroupRequest {
  [key: string]: any; // Add actual fields when known
}

export const fetchGroups = createAsyncThunk<Group[], GroupRequest, { rejectValue: AppError }>(
  'groups/fetchGroups',
  async (groupRequest, { rejectWithValue }) => {
    try {
      const response = await GroupService.searchGroup(groupRequest);
      if (response.status !== 200) {
        const errorResponse: AppError = {
          errorStatus: response.status,
          message: response.response?.data?.message || 'Failed to fetch groups',
        };
        return rejectWithValue(errorResponse);
      }
      const data: Group[] = await response.data;
      return data;
    } catch (error: any) {
      const errorResponse: AppError = {
        errorStatus: error?.response?.status || 500,
        message: error?.response?.data?.message || error?.message || 'Unknown error',
      };
      return rejectWithValue(errorResponse);
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