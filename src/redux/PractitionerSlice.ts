import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Practitioner from '@/components/model/Practitioner';
import PractitionerService from '../services/PractitionerService';
import { ReducerStates } from './ReducerStates';
import AppError from '@/components/model/AppError';

interface PractitionersState {
  practitioners: Practitioner[];
  status: ReducerStates;
  error: AppError | null;
  shouldFetch: boolean;
}

const errorObj: AppError = {
  errorStatus: 0,
  message: '',
};

const initialState: PractitionersState = {
  practitioners: [],
  status: ReducerStates.idle,
  error: errorObj,
  shouldFetch: true,
};

interface PractitionerRequest {
  [key: string]: any; // Adapt this to your actual request structure
}

// Async thunk to fetch practitioners
export const fetchPractitioners = createAsyncThunk<
  Practitioner[],
  PractitionerRequest,
  { rejectValue: AppError }
>(
  'practitioners/fetchPractitioners',
  async (practitionerRequest, { rejectWithValue }) => {
    try {
      const response = await PractitionerService.searchPractitioner(practitionerRequest);
      if (response.status !== 200) {
        const errorResponse: AppError = {
          errorStatus: response.status,
          message: response.response?.data?.message || 'Unknown error',
        };
        return rejectWithValue(errorResponse);
      }
      const data: Practitioner[] = response.data;
      return data;
    } catch (error: any) {
      return rejectWithValue({
        errorStatus: error.status || 500,
        message: error.message || 'Server Error',
      });
    }
  }
);

export const PractitionersSlice = createSlice({
  name: 'practitioners',
  initialState,
  reducers: {
    resetPractitionerStatus: (state) => {
      state.status = ReducerStates.idle;
    },
    resetPractitionersShouldFetch: (state) => {
      state.shouldFetch = false;
    },
    resetPractitioners: () => {
      return initialState;
    },
    setPractitionersShouldFetch: (state) => {
      state.shouldFetch = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPractitioners.pending, (state) => {
        state.status = ReducerStates.loading;
      })
      .addCase(fetchPractitioners.fulfilled, (state, action: PayloadAction<Practitioner[]>) => {
        state.status = ReducerStates.succeeded;
        state.practitioners = action.payload;
        state.error = null;
      })
      .addCase(fetchPractitioners.rejected, (state, action) => {
        state.status = ReducerStates.failed;
        state.error = action.payload as AppError;
      });
  },
});

export const {
  resetPractitionerStatus,
  resetPractitioners,
  resetPractitionersShouldFetch,
  setPractitionersShouldFetch,
} = PractitionersSlice.actions;

export default PractitionersSlice.reducer;
