import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import CorporateEntity from "@/components/model/CorporateEntity";
import CorporateEntityService from "@/services/CorporateEntityService";
import { ReducerStates } from "./ReducerStates";
import AppError from "@/components/model/AppError";

// --- State Types ---
interface CorporateEntitiesState {
  corporateEntities: CorporateEntity[];
  status: ReducerStates;
  error: AppError;
  shouldFetch: boolean;
}

interface CorporateEntityRequest {
  [key: string]: any;
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
  CorporateEntity[],              // return type
  CorporateEntityRequest,         // argument type
  { rejectValue: AppError }       // rejected value type
>(
  "corporateEntities/fetchCorporateEntities",
  async (corporateEntityRequest, { rejectWithValue }) => {
    try {
      const response = await CorporateEntityService.searchCorporateEntity(
        corporateEntityRequest
      );

      if (response.status !== 200) {
        const errorResponse: AppError = {
          errorStatus: response.status,
          message: response.data.message,
        };
        return rejectWithValue(errorResponse);
      }

      return response.data as CorporateEntity[];
    } catch (error: any) {
      return rejectWithValue(error as AppError);
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
