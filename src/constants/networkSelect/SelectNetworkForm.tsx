"use client";

import React from "react";
import CustomDropdown from "@/components/common/CustomDropdown";
import { OptionType } from "@/components/common/CommonFunction";

interface SelectNetworkProps {
  networkOptions: { label: string; value: string }[];
  initialSelection: OptionType;
  handleNetworkUpdate: (selectedValue: OptionType, name: string) => void;
}

const SelectNetwork: React.FC<SelectNetworkProps> = ({
  networkOptions,
  initialSelection,
  handleNetworkUpdate,
}) => {
  return (
    <div className="form-group">
      <label className="label-fixed">Network</label>
      <div className="input-flex">
        <CustomDropdown
          name="network"
          options={networkOptions}
          initialSelection={initialSelection}
          updateSelectedOption={handleNetworkUpdate}
        />
      </div>
    </div>
  );
};

export default SelectNetwork;
