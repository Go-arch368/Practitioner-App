import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGetRequest } from '../services/Service';
import ServiceURLs from '@/services/serviceURL';
import Config from '@/components/model/Config';

// Async thunk to fetch config data
export const fetchConfigData = createAsyncThunk(
  'configData/fetchConfigData',
  async () => {
    // Tell TypeScript what the response data type is
    const respConfigs = await fetchGetRequest<{ configList: Config[] }>(
      ServiceURLs.GET_CONFIG_DATA
    );

    // Extract the list safely
    const configList: Config[] = respConfigs.data?.configList ?? [];

    return { configList };
  }
);


// State type definition
type ConfigDataState = {
  loading: boolean;
  error: string | null;
  configMetaData: { configList: Config[] };
};

// Initial state
const initialState: ConfigDataState = {
  loading: false,
  error: null,
  configMetaData: { configList: [] },
};

const ConfigDataSlice = createSlice({
  name: 'configData',
  initialState,
  reducers: {
    // Add any required reducer actions here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfigData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConfigData.fulfilled, (state, action) => {
        state.loading = false;
        state.configMetaData.configList = action.payload.configList;
      })
      .addCase(fetchConfigData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default ConfigDataSlice.reducer;
