"use client"

import { useRadio } from '../../../../context/radioContext';
import ProviderSearchPractitioner from './ProviderSearchPractitioner';
import { ProviderSearchGroup } from './ProviderSearchGroup';
import { ProviderSearchCE } from './ProviderSearchCE';
import { ProviderSearchFac } from './ProviderSearchFac';
import { ProviderSearchAllProv } from './ProviderSearchAllProv';

function ProviderSearchComponents(): React.JSX.Element {
  const { selectedOption } = useRadio();

  switch (selectedOption) {
    case 'allProvRadio':
      return <ProviderSearchAllProv />;
    case 'groupRadio':
      return <ProviderSearchGroup />;
    case 'practitionerRadio':
      return <ProviderSearchPractitioner />;
    case 'corporateRadio':
      return <ProviderSearchCE />;
    case 'facilityRadio':
      return <ProviderSearchFac />;
    default:
      return <ProviderSearchAllProv />;
  }
}

export default ProviderSearchComponents;
