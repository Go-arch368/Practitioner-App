// src/components/practitionerResults/mockPractitioners.ts

import Practitioner from "../../model/Practitioner";

export const mockPractitioners: Practitioner[] = [
  {
    providerId: "P001",
    credId: "CRED001",
    lastName: "Smith",
    firstName: "John",
    middleName: "A",
    degrees: "MD",
    primarySpecialty: "Cardiology",
    networkStatus: "Active",
    primaryServiceCity: "New York",
    primaryServiceState: "NY",
    primaryServiceZip: "10001",
    tin: "123456789",
    npiType1: "1234567890",
    originalRecordId: 1,
  },
  {
    providerId: "P002",
    credId: "CRED002",
    lastName: "Johnson",
    firstName: "Emily",
    middleName: "B",
    degrees: "DO",
    primarySpecialty: "Dermatology",
    networkStatus: "Inactive",
    primaryServiceCity: "Los Angeles",
    primaryServiceState: "CA",
    primaryServiceZip: "90001",
    tin: "987654321",
    npiType1: "9876543210",
    originalRecordId: 2,
  },
  {
    providerId: "P003",
    credId: "CRED003",
    lastName: "Williams",
    firstName: "Michael",
    middleName: "C",
    degrees: "MBBS",
    primarySpecialty: "Neurology",
    networkStatus: "Active",
    primaryServiceCity: "Chicago",
    primaryServiceState: "IL",
    primaryServiceZip: "60007",
    tin: "567891234",
    npiType1: "3456789123",
    originalRecordId: 3,
  },
  // 👉 Add more records to test pagination
];

// If you want to test pagination properly,
// generate 50–100 mock records programmatically:
for (let i = 4; i <= 50; i++) {
  mockPractitioners.push({
    providerId: `P${i.toString().padStart(3, "0")}`,
    credId: `CRED${i.toString().padStart(3, "0")}`,
    lastName: `LastName${i}`,
    firstName: `FirstName${i}`,
    middleName: `M${i}`,
    degrees: i % 2 === 0 ? "MD" : "DO",
    primarySpecialty: i % 3 === 0 ? "Cardiology" : "Pediatrics",
    networkStatus: i % 2 === 0 ? "Active" : "Inactive",
    primaryServiceCity: `City${i}`,
    primaryServiceState: i % 2 === 0 ? "TX" : "FL",
    primaryServiceZip: `100${i}`,
    tin: `${100000000 + i}`,
    npiType1: `${2000000000 + i}`,
    originalRecordId: i,
  });
}
