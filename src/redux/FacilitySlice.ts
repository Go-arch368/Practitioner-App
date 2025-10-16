import { createAsyncThunk,createSlice,PayloadAction } from "@reduxjs/toolkit";
import { ReducerStates } from "./ReducerStates";
import FacilityService from "@/services/FacilityService";
import Facility from "@/components/model/Facility";
import axios from "axios";
import AppError from "@/components/model/AppError";


interface FacilitiesState {
  facilities: Facility[];
  status: ReducerStates;
  error: AppError | null;
  facilitiesType: string[];
  facilitiesSubType: string[];
  shouldFetch: boolean;
}

const initialState: FacilitiesState = {
  facilities: [],
  status: ReducerStates.idle,
  error: null,
  facilitiesType: [],
  facilitiesSubType: [],
  shouldFetch: true,
};


type FacilitiesRequest = Partial<Facility>&{
  limit?:string;
  page?:string
}

// Async thunk for fetching facilities
export const fetchFacilities = createAsyncThunk<
  Facility[],
  FacilitiesRequest,
  { rejectValue: AppError }
>(
  "facilities/fetchFacilities",
  async (facilitiesRequest, { rejectWithValue }) => {
    try {
      // 👇 Explicitly define response and request types
      const response = await FacilityService.searchFacility<
        Facility[],
        FacilitiesRequest
      >(facilitiesRequest);

      if (response.status !== 200) {
        return rejectWithValue({
          errorStatus: response.status,
          message:
            (response.data as { message?: string })?.message ||
            "Failed to fetch facilities",
        });
      }

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          errorStatus: error.response?.status || 500,
          message:
            error.response?.data?.message ||
            error.message ||
            "Unknown error",
        });
      }

      return rejectWithValue({
        errorStatus: 500,
        message: "Unknown error",
      });
    }
  }
);
// Slice
const facilitySlice = createSlice({
  name: "facilities",
  initialState,
  reducers: {
    resetFacilitiesStatus: (state) => { state.status = ReducerStates.idle; },
    resetFacilitiesType: (state) => { state.facilitiesType = []; },
    resetFacilitiesSubType: (state) => { state.facilitiesSubType = []; },
    setFacilitiesType: (state, action: PayloadAction<string[]>) => { state.facilitiesType = action.payload; },
    setFacilitiesSubType: (state, action: PayloadAction<string[]>) => { state.facilitiesSubType = action.payload; },
    updateFacilitiesType: (state, action: PayloadAction<string>) => {
      state.facilitiesType = state.facilitiesType.includes(action.payload)
        ? state.facilitiesType.filter(type => type !== action.payload)
        : [...state.facilitiesType, action.payload];
    },
    updateFacilitiesSubType: (state, action: PayloadAction<string>) => {
      state.facilitiesSubType = state.facilitiesSubType.includes(action.payload)
        ? state.facilitiesSubType.filter(type => type !== action.payload)
        : [...state.facilitiesSubType, action.payload];
    },
    updateFacilitiesSubTypeOnLeftUpdate: (state, action: PayloadAction<string[]>) => {
      const commonSubtypes = state.facilitiesSubType.filter(item => action.payload.includes(item));
      state.facilitiesSubType = Array.from(commonSubtypes);
    },
    resetFacilities: () => initialState,
    resetFacilitiesShouldFetch: (state) => { state.shouldFetch = false; },
    setFacilitiesShouldFetch: (state) => { state.shouldFetch = true; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacilities.pending, (state) => {
        state.status = ReducerStates.loading;
      })
      .addCase(fetchFacilities.fulfilled, (state, action: PayloadAction<Facility[]>) => {
        state.status = ReducerStates.succeeded;
        state.facilities = action.payload;
      })
      .addCase(fetchFacilities.rejected, (state, action) => {
        state.status = ReducerStates.failed;
        state.error = action.payload as AppError;
      });
  }
});

export const {
  resetFacilitiesStatus,
  resetFacilitiesType,
  resetFacilitiesSubType,
  setFacilitiesType,
  setFacilitiesSubType,
  updateFacilitiesType,
  updateFacilitiesSubType,
  updateFacilitiesSubTypeOnLeftUpdate,
  resetFacilities,
  resetFacilitiesShouldFetch,
  setFacilitiesShouldFetch
} = facilitySlice.actions;

export default facilitySlice.reducer;