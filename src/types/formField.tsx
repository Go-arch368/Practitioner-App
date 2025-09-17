import React from "react";

export interface FormFieldConfig {
    name:string,
    label:string,
    placeholder:string,
    validate : (value:string|string[])=>string|null;
    format?:(value:string)=>string
    onChagnge?:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    options?:string[];
    isMulti?:boolean
}   