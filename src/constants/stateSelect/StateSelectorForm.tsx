"use client";

import React, { useState, useMemo, forwardRef, useImperativeHandle } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SelectState from "./SelectState"; // Import OptionType from SelectState
import { getStateOptions } from "@/components/common/CommonFunction";
import { OptionType } from ".";

export interface StateSelectorFormRef {
  setSelectedStates: (states: OptionType[]) => void;
}

interface StateSelectorFormProps {
  initialSelection?: OptionType[];
  onSelectionChange?: (selected: OptionType[]) => void;
}
  
const StateSelectorForm = forwardRef<StateSelectorFormRef, StateSelectorFormProps>(
  ({ initialSelection = [], onSelectionChange }, ref) => {
    // Redux state and dropdown options
    const stateList = useSelector(
      (state: RootState) => state.metadata.statesMetadata.stateList
    );
    const stateOptions = useMemo(() => getStateOptions(stateList), [stateList]);
    
    // Controlled selection state
    const [selectedStates, setSelectedStates] = useState<OptionType[]>(initialSelection);

    // Handles selection updates
    const handleStatesUpdate = (selectedValues: OptionType[]) => {
      setSelectedStates(selectedValues);
      onSelectionChange?.(selectedValues);
    };

    // Ref handle for parent control
    useImperativeHandle(ref, () => ({
      setSelectedStates: (states: OptionType[]) => setSelectedStates(states),
    }));

    return (
      <SelectState
        stateOptions={stateOptions}
        initialSelection={selectedStates}
        handleStatesUpdate={handleStatesUpdate}
      />
    );
  }
);

export default StateSelectorForm;
