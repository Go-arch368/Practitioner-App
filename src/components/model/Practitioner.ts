interface Practitioner {
  providerId: string;
  credId: string;
  lastName: string;
  firstName: string;
  middleName: string;
  degrees: string;
  primarySpecialty: string;
  networkStatus: string;
  primaryServiceCity: string;
  primaryServiceState: string;
  primaryServiceZip: string;
  tin: string;
  npiType1: string;
  originalRecordId: number | null;
}

export default Practitioner;
