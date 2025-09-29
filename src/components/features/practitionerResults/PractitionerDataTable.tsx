import React, { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { FaRegFile } from 'react-icons/fa';
import SearchResultTable from '@/utils/SearchResultTable';
// import '@/component-styles/Features.css';
import { Filters } from './PractitionerFilters';
import Practitioner from '../../model/Practitioner';

interface Props {
  mData: Practitioner[];
}

export default function PractitionerDataTable({ mData }: Props) {
  // Visible columns state - adjust visibility dynamically if needed
  const [visibleColumns, setVisibleColumns] = useState<Record<keyof Practitioner, boolean>>({
    providerId: true,
    credId: true,
    lastName: true,
    firstName: true,
    middleName: true,
    degrees: true,
    primarySpecialty: true,
    networkStatus: true,
    primaryServiceCity: true,
    primaryServiceState: true,
    primaryServiceZip: true,
    tin: true,
    npiType1: true,
    originalRecordId: false, // hidden by default
  });

  // Filters state example (initially empty strings)
  const [filters, setFilters] = useState<Filters>({
    providerId: '',
    credId: '',
    lastName: '',
    firstName: '',
    middleName: '',
    degrees: '',
    primarySpecialty: '',
    networkStatus: '',
    primaryServiceCity: '',
    primaryServiceState: '',
    primaryServiceZip: '',
    tin: '',
    npiType1: '',
  });

  // Filtering data based on filters
 // Filtering data based on filters
const filteredData = useMemo(() => {
  return mData.filter((item) => {
    const matchesProviderId =
      !filters.providerId ||
      (item.providerId != null &&
        item.providerId.toLowerCase().includes(filters.providerId.toLowerCase()));

    const matchesCredId =
      !filters.credId ||
      (item.credId != null &&
        item.credId.toLowerCase().includes(filters.credId.toLowerCase()));

    const matchesLastName =
      !filters.lastName ||
      (item.lastName != null &&
        item.lastName.toLowerCase().includes(filters.lastName.toLowerCase()));

    const matchesFirstName =
      !filters.firstName ||
      (item.firstName != null &&
        item.firstName.toLowerCase().includes(filters.firstName.toLowerCase()));

    const matchesMiddleName =
      !filters.middleName ||
      (item.middleName != null &&
        item.middleName.toLowerCase().includes(filters.middleName.toLowerCase()));

    const matchesDegrees =
      !filters.degrees ||
      (item.degrees != null &&
        item.degrees.toLowerCase().includes(filters.degrees.toLowerCase()));

    const matchesPrimarySpecialty =
      !filters.primarySpecialty ||
      (item.primarySpecialty != null &&
        item.primarySpecialty
          .toLowerCase()
          .includes(filters.primarySpecialty.toLowerCase()));

    const matchesNetworkStatus =
      !filters.networkStatus ||
      (item.networkStatus != null &&
        item.networkStatus.toLowerCase().includes(filters.networkStatus.toLowerCase()));

    const matchesPrimaryServiceCity =
      !filters.primaryServiceCity ||
      (item.primaryServiceCity != null &&
        item.primaryServiceCity
          .toLowerCase()
          .includes(filters.primaryServiceCity.toLowerCase()));

    const matchesPrimaryServiceState =
      !filters.primaryServiceState ||
      (item.primaryServiceState != null &&
        item.primaryServiceState
          .toLowerCase()
          .includes(filters.primaryServiceState.toLowerCase()));

    const matchesPrimaryServiceZip =
      !filters.primaryServiceZip ||
      (item.primaryServiceZip != null &&
        item.primaryServiceZip
          .toLowerCase()
          .includes(filters.primaryServiceZip.toLowerCase()));

    const matchesTin =
      !filters.tin ||
      (item.tin != null &&
        item.tin.toLowerCase().includes(filters.tin.toLowerCase()));

    const matchesNpiType1 =
      !filters.npiType1 ||
      (item.npiType1 != null &&
        item.npiType1.toString().includes(filters.npiType1.toString()));

    return (
      matchesProviderId &&
      matchesCredId &&
      matchesLastName &&
      matchesFirstName &&
      matchesMiddleName &&
      matchesDegrees &&
      matchesPrimarySpecialty &&
      matchesNetworkStatus &&
      matchesPrimaryServiceCity &&
      matchesPrimaryServiceState &&
      matchesPrimaryServiceZip &&
      matchesTin &&
      matchesNpiType1
    );
  });
}, [mData, filters]);


  // Define columns with custom cell renderers when needed
  const columnMeta: { label: string; accessorKey: keyof Practitioner }[] = [
    { label: 'Provider Id', accessorKey: 'providerId' },
    { label: 'Cred Id', accessorKey: 'credId' },
    { label: 'Last Name', accessorKey: 'lastName' },
    { label: 'First Name', accessorKey: 'firstName' },
    { label: 'Middle', accessorKey: 'middleName' },
    { label: 'Degree(s)', accessorKey: 'degrees' },
    { label: 'Primary Specialty', accessorKey: 'primarySpecialty' },
    { label: 'Network(s)/Status', accessorKey: 'networkStatus' },
    { label: 'Primary Service City', accessorKey: 'primaryServiceCity' },
    { label: 'Primary Service State', accessorKey: 'primaryServiceState' },
    { label: 'Primary Service Zip', accessorKey: 'primaryServiceZip' },
    { label: 'TIN(s)', accessorKey: 'tin' },
    { label: 'NPI Type 1', accessorKey: 'npiType1' },
    { label: 'Original Record Id', accessorKey: 'originalRecordId' },
  ];

  // Define columns using columnMeta
  const columns = useMemo<ColumnDef<Practitioner>[]>(
    () =>
      columnMeta
        .filter((col) => visibleColumns[col.accessorKey])
        .map((col) => {
          if (col.accessorKey === 'networkStatus') {
            return {
              accessorKey: col.accessorKey,
              header: col.label,
              cell: ({ row }: any) => {
                const statuses = (row.original.networkStatus ?? '').split(',');
                return (
                  <div>
                    {statuses.map((status: string, idx: number) => (
                      <div key={idx}>{status.trim()}</div>
                    ))}
                  </div>
                );
              },
            };
          } else if (col.accessorKey === 'tin') {
            return {
              accessorKey: col.accessorKey,
              header: col.label,
              cell: ({ row }: any) => {
                const tins = (row.original.tin ?? '').split(',');
                return (
                  <div>
                    {tins.map((tin: string, idx: number) => (
                      <div key={idx} style={{ whiteSpace: 'nowrap' }}>
                        {tin.trim()}
                      </div>
                    ))}
                  </div>
                );
              },
            };
          } else if (col.accessorKey === 'providerId') {
            return {
              accessorKey: col.accessorKey,
              header: col.label,
              cell: ({ row }: any) => {
                const practitioner = row.original;
                return (
                  <Link
                    to={`/view-practitioner/${practitioner.providerId}`}
                    state={{ practitioner }}
                    style={{ cursor: 'pointer' }}
                  >
                    <FaRegFile title="View Practitioner" />
                  </Link>
                );
              },
            };
          } else {
            return {
              accessorKey: col.accessorKey,
              header: col.label,
              cell: ({ row }: any) => row.original[col.accessorKey] ?? '',
            };
          }
        }),
    [visibleColumns]
  );


  return (
   
      <SearchResultTable<Practitioner,Filters> filteredData={filteredData} columns={columns} filters={filters} setFilters={setFilters} />
   
  );
}
