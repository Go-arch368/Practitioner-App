import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import CorporateEntity from "@/components/model/CorporateEntity";
import CorporateEntityService from "@/services/CorporateEntityService";
import { ReducerStates } from "./ReducerStates";
import AppError from "@/components/model/AppError";
import axios from "axios";

// --- State Types ---
interface CorporateEntitiesState {
  corporateEntities: CorporateEntity[];
  status: ReducerStates;
  error: AppError;
  shouldFetch: boolean;
}



type CorporateEntityRequest = Partial<CorporateEntity>&{
     limit?:string;
     page?:string
}

// --- Default Error Object ---
const errorObj: AppError = {
  errorStatus: 0,
  message: "",
};

// --- Initial State ---
const initialState: CorporateEntitiesState = {
  corporateEntities: [],
  status: ReducerStates.idle,
  error: errorObj,
  shouldFetch: true,
};

// --- Async Thunk ---
export const fetchCorporateEntities = createAsyncThunk<
  CorporateEntity[],
  CorporateEntityRequest,
  { rejectValue: AppError }
>(
  "corporateEntities/fetchCorporateEntities",
  async (request, { rejectWithValue }) => {
    try {
    const response = await CorporateEntityService.searchCorporateEntity<CorporateEntityRequest>(request);


      if (response.status !== 200) {
        return rejectWithValue({
          errorStatus: response.status,
          message: (response.data as { message?: string })?.message || "Failed to fetch corporate entities",
        }) as ReturnType<typeof rejectWithValue>;
      }

      return response.data as CorporateEntity[];
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          errorStatus: error.response?.status || 500,
          message: error.response?.data?.message || error.message || "Unknown error",
        }) as ReturnType<typeof rejectWithValue>;
      }
      return rejectWithValue({ errorStatus: 500, message: "Unknown error" }) as ReturnType<typeof rejectWithValue>;
    }
  }
);


// --- Slice ---
export const corporateEntitiesSlice = createSlice({
  name: "corporateEntities",
  initialState,
  reducers: {
    resetCorporateEntityStatus: (state) => {
      state.status = ReducerStates.idle;
    },
    resetCorporateEntity: () => initialState,
    resetCorporateEntityShouldFetch: (state) => {
      state.shouldFetch = false;
    },
    setCorporateEntityShouldFetch: (state) => {
      state.shouldFetch = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCorporateEntities.pending, (state) => {
        state.status = ReducerStates.loading;
      })
      .addCase(
        fetchCorporateEntities.fulfilled,
        (state, action: PayloadAction<CorporateEntity[]>) => {
          state.status = ReducerStates.succeeded;
          state.corporateEntities = action.payload;
        }
      )
      .addCase(fetchCorporateEntities.rejected, (state, action) => {
        state.status = ReducerStates.failed;
        state.error = action.payload as AppError;
      });
  },
});


export const {
  resetCorporateEntityStatus,
  resetCorporateEntity,
  setCorporateEntityShouldFetch,
  resetCorporateEntityShouldFetch,
} = corporateEntitiesSlice.actions;

export default corporateEntitiesSlice.reducer;
