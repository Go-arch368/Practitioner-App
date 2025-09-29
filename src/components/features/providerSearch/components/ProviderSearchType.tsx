"use client";
import React, { ChangeEvent } from 'react';
import { useRadio } from '../../../../context/radioContext';
import '../../../../styles/CustomStyles.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { noRecordFoundFalse } from '@/redux/NoResultSlice';
import { resetCorporateEntity, resetCorporateEntityShouldFetch } from "@/redux/CorporateEntitySlice";
import { resetFacilities, resetFacilitiesShouldFetch } from '../../../../redux/FacilitySlice';
import { resetGroups, resetGroupsShouldFetch } from '@/redux/groupSlice';
import { resetPractitioners, resetPractitionersShouldFetch } from '../../../../redux/PractitionerSlice';

const radioOptions = [
  { id: 'allProvRadio', label: 'All' },
  { id: 'groupsRadio', label: 'Groups' },
  { id: 'practitionerRadio', label: 'Practitioner' },
  { id: 'corporateRadio', label: 'Corporate Entity' },
  { id: 'facilityRadio', label: 'Facility' }
];

const ProviderSearchType: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedOption, handleRadioSelection } = useRadio();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleRadioSelection(event.target.value);
    dispatch(noRecordFoundFalse());
    dispatch(resetCorporateEntity());
    dispatch(resetFacilities());
    dispatch(resetGroups());
    dispatch(resetPractitioners());
    dispatch(resetCorporateEntityShouldFetch());
    dispatch(resetFacilitiesShouldFetch());
    dispatch(resetGroupsShouldFetch());
    dispatch(resetPractitionersShouldFetch());
  };

  return (
    <div className="radio-row">
      <div className="form-check form-check-inline label-block">
        <label>Provider Type:</label>
      </div>
      {radioOptions.map(({ id, label }) => (
        <div className="form-check form-check-inline" key={id}>
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id={id}
            value={id}
            checked={selectedOption === id}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor={id}>
            {label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ProviderSearchType;
