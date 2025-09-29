import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AllProvider from "@/components/model/AllProvider";
import AllProviderService from "../services/AppProviderService"
import { ReducerStates } from "./ReducerStates";
import AppError from "@/components/model/AppError";

// Default error object
const errorObj: AppError = {
  errorStatus: 0,
  message: "",
};

// State interface
interface AllProviderState {
  allproviders: AllProvider[];
  status: ReducerStates;
  error: AppError;
}

// Initial state
const initialState: AllProviderState = {
  allproviders: [],
  status: ReducerStates.idle,
  error: errorObj,
};

// Request interface
interface AllProviderRequest {
  [key: string]: any;
}

// Async thunk to fetch providers
export const fetchAllProviders = createAsyncThunk<
  AllProvider[],
  AllProviderRequest,
  { rejectValue: AppError }
>(
  "allproviders/fetchAllProviders",
  async (allProviderRequest: AllProviderRequest, { rejectWithValue }) => {
    try {
      const response = await AllProviderService.searchAllProviders(allProviderRequest);

      if (response.status !== 200) {
        const errorResponse: AppError = {
          errorStatus: response.status,
          message: response.response?.data?.message || "Something went wrong",
        };
        return rejectWithValue(errorResponse);
      }

      const data: AllProvider[] = response.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Slice
export const AllProviderSlice = createSlice({
  name: "allproviders",
  initialState,
  reducers: {
    resetAllProviderStatus: (state) => {
      state.status = ReducerStates.idle;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProviders.pending, (state) => {
        state.status = ReducerStates.loading;
      })
      .addCase(
        fetchAllProviders.fulfilled,
        (state, action: PayloadAction<AllProvider[]>) => {
          state.status = ReducerStates.succeeded;
          state.allproviders = action.payload;
        }
      )
      .addCase(fetchAllProviders.rejected, (state, action) => {
        state.status = ReducerStates.failed;
        state.error = action.payload as AppError;
      });
  },
});

// Actions
export const { resetAllProviderStatus } = AllProviderSlice.actions;

// Reducer
export default AllProviderSlice.reducer;
