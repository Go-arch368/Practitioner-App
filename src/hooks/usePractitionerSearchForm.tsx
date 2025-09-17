import { useFormField } from "./useFormField";
import { formatSSN } from "@/constants/formFields/util/formatSSN";
import {
  lastNameField,
  firstNameField,
  ssnField,
  tinField,
  credIdField,
  npiType1Field,
  stateField,
  caqhIdField,
  networkField,
  internalIdField,
  viantHNSIdField,
  contractField,
} from "../constants/formFields";

export const usePractitionerSearchForm = () => {
  const lastName = useFormField(lastNameField);
  const firstName = useFormField(firstNameField);
  const ssn = useFormField({
    ...ssnField,
    format: formatSSN,
  });
  const tin = useFormField(tinField);
  const credId = useFormField(credIdField);
  const npiType1 = useFormField(npiType1Field);
  const state = useFormField(stateField);
  const caqhId = useFormField(caqhIdField);
  const network = useFormField(networkField);
  const internalId = useFormField(internalIdField);
  const viantHNSId = useFormField(viantHNSIdField);
  const contractNo = useFormField(contractField);

  const fields = [
    lastName,
    firstName,
    ssn,
    tin,
    credId,
    npiType1,
    state,
    caqhId,
    network,
    internalId,
    viantHNSId,
    contractNo,
  ];

  const validateAll = () => fields.map(field => field.validate()).every(valid => !valid);
  const hasAnyFieldFilled = () =>
    fields.some(field =>
      field.isMulti ? field.value.length > 0 : field.value !== ""
    );
  const validateAllWithoutError = () =>
    fields.map(field => field.validateWithoutError()).every(valid => !valid);

  const getFormData = () => ({
    lastName: lastName.value,
    firstName: firstName.value,
    ssn: ssn.value,
    tin: tin.value,
    credId: credId.value,
    npiType1: npiType1.value,
    state: state.value,
    network: network.value,
    caqhProviderId: caqhId.value,
    internalId: internalId.value,
    viantHNSId: viantHNSId.value,
    contractNo: contractNo.value,
  });

  const clearFields = () => {
    fields.forEach(field =>
      field.isMulti ? field.setValue([]) : field.setValue("")
    );
  };

  const removeFieldErrors = () => fields.forEach(field => field.removeError());

  return {
    fields,
    validateAll,
    getFormData,
    hasAnyFieldFilled,
    validateAllWithoutError,
    clearFields,
    removeFieldErrors,
  };
};
