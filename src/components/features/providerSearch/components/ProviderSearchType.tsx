import React, { ChangeEvent } from 'react';
import { useRadio } from '../../../../context/radioContext';
import '../../../../styles/CustomStyles.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { noRecordFoundFalse } from '@/redux/NoResultSlice';
// import {
//   resetCorporateEntity,
//   resetCorporateEntityShouldFetch,
// } from '../../../../redux/CorporateEntitySlice';

//needed to write 
import {resetCorporateEntity,resetCorporateEntityShouldFetch} from "@/redux/CorporateEntitySlice"
//needed to write
import {
  resetFacilities,
  resetFacilitiesShouldFetch,
} from '../../../../redux/FacilitySlice';
//needed to write
import { resetGroups, resetGroupsShouldFetch } from '../../../../redux/GroupSlice';
import {
  resetPractitioners,
  resetPractitionersShouldFetch,
} from '../../../../redux/PractitionerSlice';

const radioOptions = [
  { id: 'allProvRadio', label: 'All' },
  { id: 'groupsRadio', label: 'Groups' },
  {id:"practitionerRadio",label:"Practitioner"},
  {id:"corporateRadio",label:"Corporate Entity"},
  {id:"facililyRadio",label:"Facility"}
  
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
    <div className="d-flex flex-row p-3 pb-0">
      <div className="form-check form-check-inline" style={{ padding: '0 1rem 0 0' }}>
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
