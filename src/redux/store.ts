import { configureStore } from '@reduxjs/toolkit';

import groupsReducer from "./groupSlice"
import noResultReducer from "./NoResultSlice"
import facilitiesReducer from "./FacilitySlice"
import practitionersReducer from "./PractitionerSlice"


import allProvidersReducer from "./AllProviderSlice"

import corporateEntityReducer from "./CorporateEntitySlice"

import metadataReducer from "./metadataSlice"
import configDataReducer from "./ConfigDataSlice"

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