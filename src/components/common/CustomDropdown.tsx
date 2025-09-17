import { useEffect, useState } from "react";
import { default as ReactSelect } from "react-select";
import { OptionType } from "@/components/common/CommonFunction";

interface DropDownProps {
  name: string;
  options: OptionType[];
  initialSelection: OptionType;
  updateSelectedOption: (selectedValue: OptionType, name: string) => void;
}

const CustomDropdown = (props: DropDownProps) => {
  const { name, options, initialSelection, updateSelectedOption } = props;
  const [selectedValue, setSelectedValue] = useState<OptionType>(initialSelection);

  useEffect(() => {
    updateSelectedOption(selectedValue, name);
  }, [selectedValue, name, updateSelectedOption]);

  useEffect(() => {
    setSelectedValue(initialSelection);
  }, [initialSelection]);

  const handleChange = (changedOption: OptionType | null) => {
    const value = changedOption ? changedOption : { label: "", value: "" };
    setSelectedValue(value);
  };

  return (
    <div data-testid={name} className="form-group form-state" style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ width: 200 }}>
        <ReactSelect
          options={options}
          value={selectedValue}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CustomDropdown;
