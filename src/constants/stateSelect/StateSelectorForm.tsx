"use client";

import React, { useState, useMemo, forwardRef, useImperativeHandle } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SelectState from "./SelectState"; // Import OptionType from SelectState
import { getStateOptions } from "@/components/common/CommonFunction";

export interface StateSelectorFormRef {
  setSelectedStates: (states: any[]) => void;
}

interface StateSelectorFormProps {
  initialSelection?: any[];
  onSelectionChange?: (selected: any[]) => void;
}

const StateSelectorForm = forwardRef<StateSelectorFormRef, StateSelectorFormProps>(
  ({ initialSelection = [], onSelectionChange }, ref) => {
    // Redux state and dropdown options
    const stateList = useSelector(
      (state: RootState) => state.metadata.statesMetadata.stateList
    );
    const stateOptions = useMemo(() => getStateOptions(stateList), [stateList]);
    
    // Controlled selection state
    const [selectedStates, setSelectedStates] = useState<any[]>(initialSelection);

    // Handles selection updates
    const handleStatesUpdate = (selectedValues: any[]) => {
      setSelectedStates(selectedValues);
      onSelectionChange?.(selectedValues);
    };

    // Ref handle for parent control
    useImperativeHandle(ref, () => ({
      setSelectedStates: (states: any[]) => setSelectedStates(states),
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
