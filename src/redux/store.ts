import { configureStore } from '@reduxjs/toolkit';
import groupsReducer from './groupslice';
import noResultReducer from './NoResultslice';
import facilitiesReducer from './Facilityslice';

import practitionersReducer from "./PractitionerSlice"

import allProviderReducer from "./AllProviderSlice"
import corporateEntityReducer from './CorporateEntityslice';
import metadataReducer from './metadataslice';
import configDataReducer from './ConfigDataslice';

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    noResult: noResultReducer,
    facilities: facilitiesReducer,
    practitioners: practitionersReducer,
    allProviders: allProvidersReducer,
    corporateEntities: corporateEntityReducer,
    metadata: metadataReducer,
    configData: configDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store