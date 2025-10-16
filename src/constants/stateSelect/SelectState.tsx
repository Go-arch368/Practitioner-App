"use client";

import React from "react";
import MultiselectDropdown from "./MultiselectDropdown";
import { OptionType } from ".";



interface SelectStateProps {
  stateOptions: {label:string;value:string}[];
  initialSelection: OptionType[];
  handleStatesUpdate: (selectedValues: OptionType[], name: string) => void;
}

const SelectState: React.FC<SelectStateProps> = ({
  stateOptions,
  initialSelection,
  handleStatesUpdate,
}) => {
  return (
    <div className="form-group">
      <label className="label-fixed">State</label>
      <div className="input-flex">
        <MultiselectDropdown
          name=" "
          options={stateOptions}
          initialSelection={initialSelection}
          updateSelectedOptions={handleStatesUpdate}
        />
      </div>
    </div>
  );
};

export default SelectState;
