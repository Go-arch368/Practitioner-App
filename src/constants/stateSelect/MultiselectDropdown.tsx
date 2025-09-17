"use client";

import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import ReactSelect, { components, createFilter, OptionProps } from "react-select";
import { getOptions } from "@/components/common/CommonFunction";
import { OptionType } from ".";

interface DropDownProps {
  name: string;
  inputId?: string;
  options: {
    label:string,
    value:string
  }[];
  initialSelection: OptionType[],
  updateSelectedOptions: (selectedValues: OptionType[], name: string) => void;
}

const MultiselectDropdown= (props:DropDownProps) => {
 
  const {name,options,initialSelection,inputId} = props
  const [selectedValues, setSelectedValues] = useState<OptionType[]>(initialSelection || []);

  useEffect(() => {
    props.updateSelectedOptions( selectedValues,name);
  }, [selectedValues,name]);

  useEffect(()=>{
    setSelectedValues(initialSelection||[])
  },[initialSelection])

  const Option = (props: any) => {
    return (
      <div data-testid={props.label}>
        <components.Option {...props} style={{ borderRadius: "var(--ba-border-radius)" }}>
          <Form.Check
            checked={props.isSelected}
            type="checkbox"
            label={props.label}
            onChange={() => {}}
            style={{borderRadius:"var(--bs-border-radius)"}}
          />
        </components.Option>
      </div>
    );
  };

  const handleChange = (changedOptions: any) => {
    const values = getOptions(changedOptions, selectedValues, options);
    setSelectedValues(values);
    
  };

  return (
    <div
      data-testid={name}
      className="form-group form-state"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <ReactSelect
        inputId={inputId}
        key={name}
        options={options}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        isSearchable
        openMenuOnClick
        components={{ Option }}
        value={selectedValues}
        onChange={handleChange}
        placeholder={name}
        filterOption={createFilter({
          ignoreAccents: true,
          matchFrom: "start",
          stringify: (option) => (option?.label ? option.label.toLowerCase() : ""),
        })}
        menuPortalTarget={typeof window !== "undefined" ? document.body : null}
        styles={{
          container: (provided) => ({
            ...provided,
            width: "115%",
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),
          control: (provided) => ({
            ...provided,
            maxHeight: "100px",
            overflowY: "hidden",
          }),
          valueContainer: (provided) => ({
            ...provided,
            maxHeight: "100px",
            overflowY: "auto",
          }),
        }}
      />
    </div>
  );
};

export default MultiselectDropdown;
