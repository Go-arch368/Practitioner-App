import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Practitioner from '@/components/model/Practitioner';
import PractitionerService from '../services/PractitionerService';
import { ReducerStates } from './ReducerStates';
import AppError from '@/components/model/AppError';
import axios from "axios"

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

// Extend request type to allow extra params like limit/page
export type PractitionerRequest = Partial<Practitioner> & {
  limit?: string;
  page?: string;
};

// Async thunk
export const fetchPractitioners = createAsyncThunk<
  Practitioner[],
  PractitionerRequest,
  { rejectValue: AppError }
>('practitioners/fetchPractitioners', async (practitionerRequest:PractitionerRequest, { rejectWithValue }) => {
  console.log("Before request:", practitionerRequest);
  try {
    const response = await PractitionerService.searchPractitioner(practitionerRequest);
    console.log("After request:", response);

    if (response.status !== 200) {
      const errorResponse: AppError = {
        errorStatus: response.status,
        message: (response.data as { message?: string })?.message || 'Unknown error',
      };
      return rejectWithValue(errorResponse);
    }

    return response.data as Practitioner[];
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
});

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
