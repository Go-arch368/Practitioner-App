import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios,{AxiosError} from "axios";
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


type AllProviderRequest = Partial<AllProvider>&{
  limit?:string,
  page?:string
}

// Async thunk to fetch providers
export const fetchAllProviders = createAsyncThunk<
  AllProvider[],
  AllProviderRequest,
  { rejectValue: AppError }
>(
  "allproviders/fetchAllProviders",
  async (allProviderRequest, { rejectWithValue }) => {
    try {
      const response = await AllProviderService.searchAllProviders<AllProvider[], AllProviderRequest>(allProviderRequest);

      if (response.status !== 200) {
        return rejectWithValue({
          errorStatus: response.status,
          message: "Something went wrong",
        });
      }

      return response.data; // TS now knows this is AllProvider[]
    } catch (e) {
  if (axios.isAxiosError(e)) {
    const err: AppError = {
      errorStatus: e.response?.status || 500,
      message: (e.response?.data as { message?: string })?.message || e.message || "Unknown error",
    };
    return rejectWithValue(err);
  } else if (e instanceof Error) {
    // Only access message if it's an Error
    return rejectWithValue({ errorStatus: 500, message: e.message });
  } else {
    return rejectWithValue({ errorStatus: 500, message: "Unknown error" });
  }
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
