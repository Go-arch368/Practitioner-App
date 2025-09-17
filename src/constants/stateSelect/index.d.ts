// types/category.ts

export type CategoryValues = {
  id: string;
  description: string;
};

export type CategoryData = {
  name: string;
  data: CategoryValues[];
};

export type OptionType = {
  value: string;
  label: string;
};

// If you want a nested structure, rename this
export type OptionGroup = {
  name: string;
  data: OptionType[];
};
