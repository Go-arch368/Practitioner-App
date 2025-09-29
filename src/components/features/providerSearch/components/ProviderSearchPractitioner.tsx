'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import {
  fetchPractitioners, resetPractitioners, resetPractitionersShouldFetch,
  resetPractitionerStatus, setPractitionersShouldFetch,
} from "@/redux/PractitionerSlice";
import { ReducerStates } from '@/redux/ReducerStates';
import NoResult from '@/utils/NoResult';
import { noRecordFoundFalse, noRecordFoundTrue } from '../../../../redux/NoResultSlice';
import { Button, Form } from 'react-bootstrap';
import { CANCEL, SEARCH } from '@/constants/Constants';
import DataTable from '../../practitionerResults/PractitionerDataTable';
import '../../../../styles/CustomStyles.css';
import StateSelectorForm, { StateSelectorFormRef } from '../../../../constants/stateSelect/StateSelectorForm';
import NetworkSelectorForm, { NetworkTypeSelectorFormRef } from '@/constants/networkSelect/NetworkSelectorForm';
import ErrorPage from '@/utils/ErrorPage';
import FormField from '../../../common/FormField';
import { usePractitionerSearchForm } from '@/hooks/usePractitionerSearchForm';
import Loader from '@/components/common/Loader';
import ExpandableComponent,{ExpandedComponentRef} from '@/utils/ExpandableComponent';
import ErrorModal from '@/utils/ErrorModal';
import { retrieveConfig, setLimitOnFormData } from '@/utils/MP3Utility';
import ToolTip from '@/components/common/ToolTip';

const ADVANCED_FIELDS = [
  "CAQH Provider ID",
  "ssn",
  "Internal ID",
  "Viant HNS ID",
  "Viant CE ID",
  "Contract",
  "Network",
];

const ProviderSearchPractitioner: React.FC = () => {
  const {
    fields,
    validateAll,
    getFormData,
    hasAnyFieldFilled,
    validateAllWithoutError,
  } = usePractitionerSearchForm();

  console.log(fields)

  const advancedFields = fields.filter(f => ADVANCED_FIELDS.includes(f.name));
  const basicFields = fields.filter(f => !ADVANCED_FIELDS.includes(f.name));

  const [showResult, setShowResult] = useState(false);
  const [showErrorPage, setShowErrorPage] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [configLimit, setConfigLimit] = useState('');
  const { configList } = useSelector((state: RootState) => state.configData.configMetaData);
  const [disableSearchButton, setDisableSearchButton] = useState(false);
  const [errorsExist, setErrorsExist] = useState(false);

  const stateSelectorRef = useRef<StateSelectorFormRef>(null);
  const networkTypeSelectorRef = useRef<NetworkTypeSelectorFormRef>(null);
  const expandedComponentRef = useRef<ExpandedComponentRef>(null)

  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const { practitioners, status, error, shouldFetch } = useSelector(
    (state: RootState) => state.practitioners
  );
  const { noResult } = useSelector((state: RootState) => state.noResult);

  const cancel = () => {
    dispatch(resetPractitionerStatus());
    setShowResult(false);
    dispatch(noRecordFoundFalse());
    dispatch(resetPractitioners());
    dispatch(resetPractitionersShouldFetch());
    router.push('/');
  };

  const handleModalClose = () => setShowErrorModal(false);

  const searchProvider = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setPractitionersShouldFetch());
    if (validateAll()) return;
    const fullFormData = getFormData();

    const limitConfig = retrieveConfig(configList, 'SEARCH_LIMIT');
    setConfigLimit(limitConfig ?? '1000');
    const updatedFormData = setLimitOnFormData(limitConfig ?? '1000', fullFormData);
    console.log("updated form data", updatedFormData)
    dispatch(fetchPractitioners(updatedFormData));
  };

  const handleErrors = () => {
    if (validateAllWithoutError() && hasAnyFieldFilled()) {
      setDisableSearchButton(false);
      setErrorsExist(false);
    } else {
      setDisableSearchButton(true);
      setErrorsExist(true);
    }
  };

  useEffect(() => {
    handleErrors();
    if (status === ReducerStates.failed) {
      dispatch(noRecordFoundFalse());
      dispatch(resetPractitionerStatus());
      setShowErrorPage(true);
      setShowResult(false);
    } else if (status === ReducerStates.succeeded) {
      dispatch(resetPractitionerStatus());
      setShowErrorPage(false);
      if (practitioners.length >= 1000) setShowErrorModal(true);
      if (practitioners.length > 0) {
        setShowResult(true);
        dispatch(noRecordFoundFalse());
      } else {
        dispatch(noRecordFoundTrue());
      }
    } else if (status === ReducerStates.loading) {
      setShowErrorPage(false);
      setShowResult(false);
      dispatch(noRecordFoundFalse());
    }
  }, [practitioners, status, error, dispatch]);

  return (
    <div className="body-wrapper">
      <Form onSubmit={searchProvider}>
        <div className="styled-card mb-2">
          <div className="styled-card-header"><strong>General</strong></div>
          <div className="card-body form-pad">
            <div className="d-flex flex-wrap" style={{ rowGap: '1rem' }}>
              {basicFields.map(field => (
                <div className="form-group-wrapper" key={field.name}>
                  {field.name === 'State' && field.isMulti ? (
                    <StateSelectorForm
                      ref={stateSelectorRef}
                      initialSelection={Array.isArray(field.value) ? field.value : field.value ? [field.value] : []}
                      onSelectionChange={selected => field.setValue(selected.map((s: any) => s.value))}
                    />
                  ) : (
                    <FormField field={field} />
                  )}
                </div>
              ))}
            </div>
            <ExpandableComponent title="Advanced Search Options" searchPage="practitionerSearch" ref={expandedComponentRef}>
              <div className="d-flex flex-wrap" style={{ rowGap: '1rem' }}>
                {advancedFields.map(field => (
                  <div className="form-group-wrapper" key={field.name}>
                    {field.name === "network" ? (
                      <NetworkSelectorForm
                        ref={networkTypeSelectorRef}
                        initialSelection={Array.isArray(field.value) ? field.value[0] : field.value || ""}
                        onSelectionChange={selected => field.setValue(selected ? selected.value : "")}
                      />
                    ) : (
                      <FormField field={field} />
                    )}
                  </div>
                ))}
              </div>
            </ExpandableComponent>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-4">
          <button type="button" className="btn btn-secondary me-3" onClick={cancel}>{CANCEL}</button>
          {disableSearchButton ? (
            errorsExist ? (
              <div>
                <Button type="submit" disabled>{SEARCH}</Button>
                <ToolTip tooltip_testid="button-tooltip" text="Please fix all Validation Errors before Search" />
              </div>
            ) : (
              <div>
                <Button type="submit" disabled>{SEARCH}</Button>
                <ToolTip tooltip_testid="button-tooltip" text="Please fill at least one search criteria before Search" />
              </div>
            )
          ) : (
            <Button type="submit">{SEARCH}</Button>
          )}
        </div>
      </Form>
      <div className="results-wrapper">
        {shouldFetch && showResult && practitioners.length > 0 && <DataTable mData={practitioners} />}
        {noResult && <NoResult />}
        {showErrorPage && <ErrorPage appError={error} />}
      </div>
      {showErrorModal && (
        <ErrorModal
          error={`Maximum search results found, displaying first ${configLimit} records, please refine search criteria`}
          handleClose={handleModalClose}
        />
      )}
      {status === ReducerStates.loading && <Loader onCancel={cancel} />}
    </div>
  );
};

export default ProviderSearchPractitioner;
