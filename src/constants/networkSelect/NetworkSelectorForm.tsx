import React, { useState, useMemo, forwardRef, useImperativeHandle, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SelectNetwork from './SelectNetworkForm';
import { getNetworkOptions } from '@/components/common/CommonFunction';
import { RootState } from '@/redux/store';

export type OptionType = {
  label: string;
  value: string;
};

interface NetworkSelectorFormProps {
  initialSelection: OptionType | string | null;
  onSelectionChange?: (selected: OptionType) => void;
}

export interface NetworkTypeSelectorFormRef {
  setSelectedNetwork: (network: OptionType) => void;
}

const NetworkSelectorForm = forwardRef<NetworkTypeSelectorFormRef, NetworkSelectorFormProps>(
  ({ initialSelection, onSelectionChange }, ref) => {
    const networkList = useSelector(
      (state: RootState) => state.metadata.statesMetadata.networkList
    );

    const networkOptions = useMemo(() => getNetworkOptions(networkList), [networkList]);

    const resolveInitialSelection = (): OptionType | null => {
      if (typeof initialSelection === 'string') {
        return networkOptions.find((opt) => opt.value === initialSelection) || null;
      }
      return initialSelection ?? null;
    };

    const [selectedNetwork, setSelectedNetwork] = useState<OptionType | null>(resolveInitialSelection());

    // Update state if props change (needed for dynamic form libraries)
    useEffect(() => {
      setSelectedNetwork(resolveInitialSelection());
    }, [initialSelection, networkOptions]);

    const handleNetworkUpdate = (selectedValue: OptionType) => {
      setSelectedNetwork(selectedValue);
      onSelectionChange?.(selectedValue);
    };

    useImperativeHandle(ref, () => ({
      setSelectedNetwork: (network: OptionType) => {
        setSelectedNetwork(network);
      },
    }));

    return (
    <SelectNetwork
  networkOptions={networkOptions}
  initialSelection={selectedNetwork || networkOptions[0]} // fallback if null
  handleNetworkUpdate={handleNetworkUpdate}
/>

    );
  }
);

export default NetworkSelectorForm;
