import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGetRequest } from '../services/Service';
import ServiceURLs from '@/services/serviceURL';

// Async thunk for fetching metadata
export const fetchMetadata = createAsyncThunk(
  'metadata/fetchMetadata',
  async () => {
    const resp = await fetchGetRequest(ServiceURLs.GET_REF_DATA);
    const stateList = resp?.data?.stateList ?? [];
    const networkList = resp?.data?.networkList ?? []; // ✅ Ensure this is included in the API or mocked
    return { stateList, networkList };
  }
);

// State type definition
type MetadataState = {
  loading: boolean;
  error: string | null;
  statesMetadata: {
    stateList: any[];
    networkList: any[]; // ✅ Now correctly typed
  };
  categoryMetadata: any[];
  previousStateSelection: {
    selectState: any[];
  };
};

// Initial state
const initialState: MetadataState = {
  loading: false,
  error: null,
  statesMetadata: {
    stateList: [],
    networkList: [], // ✅ Must be initialized here too
  },
  categoryMetadata: [],
  previousStateSelection: {
    selectState: [],
  },
};

// Slice
const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {
    setCategoryMetadata(state, action) {
      state.categoryMetadata = action.payload;
    },
    setPreviousStateSelection(state, action) {
      state.previousStateSelection = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetadata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMetadata.fulfilled, (state, action) => {
        state.loading = false;
        state.statesMetadata = action.payload; // ✅ This works now because action.payload includes both
      })
      .addCase(fetchMetadata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { setCategoryMetadata, setPreviousStateSelection } = metadataSlice.actions;
export default metadataSlice.reducer;
