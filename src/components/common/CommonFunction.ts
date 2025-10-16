export const getEnv = (hostname: string): string => {
  const envs = ["dev.", "sqa.", "reg.", "stg.", "bat.", "cit."];
  const filteredEnv = envs.filter((env) => hostname.includes(env));
  return filteredEnv !== null && filteredEnv !==undefined && filteredEnv.length>0?filteredEnv[0]:""
};


export interface StateItem {
  detail: string;
  id: string;
};

export interface DropdownItem  {
  detail: string;
  id: string;
};

interface DropdownOption {
  label:string;
  value:string;
}

export interface OptionType{
  label:string;
  value:string
}

/**
 * Returns environment substring if hostname contains one of the known envs.
 */


/**
 * Calculates new selected values from options, previous selected, and all data,
 * with special logic to handle "Select All" option.
 */

export function getOptions(
  options: OptionType[], // which contains all the values 
  selectedValues: OptionType[], // current value
  data: OptionType[] // newly selected data
): OptionType[] {
  let values: OptionType[] = [];

  if (options && options.length > 0) {
    const allIndex = options.findIndex(
      (op:OptionType) => op.value === "*" || op.value.split(":")[1] === "*"
    );

    if (allIndex > -1) {
      // If all option selected and selected values equals data length, remove "all" option
      if (selectedValues.length === data.length) {
        options.splice(allIndex, 1);
        values = options;
      } else {
        values = data;
      }
      // Decide which values to return
      values = selectedValues.length ? data : options;
    } else {
      if (options.length === data.length - 1) {
        if (
          selectedValues[0]?.value === "*" ||
          selectedValues[0]?.value.split(":")[1] === "*"
        ) {
          values = [];
        } else {
          values = data;
        }
      } else if (selectedValues[0]?.value.split(":")[1] === "") {
        values = options;
      } else {
        values = options;
      }
    }
  }

  return values;
}


/**
 * Converts an array of StateItem to DropdownOption array,
 * prepends a "Select All" option at the top.
 */
export function getStateOptions(
  statelist: StateItem[] | undefined
): DropdownOption[] {
  if (!statelist || statelist.length === 0) return [];

  const transformed: DropdownOption[] = statelist.map((state) => ({
    label: state.detail,
    value: state.id,
  }));

  // Add the "Select All" option at the top
  transformed.unshift({ label: "Select All", value: "*" });

  return transformed;
}


/**
 * Parses a date string in "MM/DD/YYYY" format to a Date object
 */
export function parseDateStringToDateObject(
  dateStr: string | null | undefined
): Date | null {
  if (!dateStr) return null;
  const [mm,dd,yyyy] = dateStr.split("/");
  if(!mm||!dd||!yyyy) return null;
  return new Date(+yyyy,+mm -1 ,+dd);
}

/**
 * Formats a Date object as "MM/DD/YYYY" string
 */
export function getDateStringFromDateObject(date: Date | null): string {
  if (!date) return "";
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  const y = date.getFullYear().toString();
  return `${m}/${d}/${y}`;
}


export function getNetworkOptions(networkList:DropdownItem[]|undefined):DropdownOption[]{
  if(!networkList||networkList.length===0) return []

  const options = networkList.map((network)=>({
    label:network.detail,
    value:network.id
  }))

  options.unshift({label:"",value:""})
  return options
}

export function getEntityTypeOptions(providerCategoryList:DropdownItem[]|undefined):DropdownOption[]{
  if(!providerCategoryList || providerCategoryList.length===0) return [];
  const options = providerCategoryList.map((entityType)=>({
    label:entityType.detail,
    value:entityType.id
  }))
  options.unshift({label:"",value:""})
  return options
}

