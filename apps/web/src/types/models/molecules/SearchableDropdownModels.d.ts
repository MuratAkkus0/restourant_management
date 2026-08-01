export interface SearchableDropdownProps {
  dataList: { name: string; code: string }[];
  defaultValue?: string;
  onDataSelect: (data: string) => void;
}
export interface DropdownSearchProps {
  dataList: { name: string; code: string }[];
  onDataSelect: (data: string) => void;
  isDropdownOpen: boolean;
  setSelectedCountry: CallableFunction;
  setDropdownOpen: CallableFunction;
}
export interface DropdownResultListProps {
  filteredCountries: Array<any>;
  handleSelectCountry: CallableFunction;
}
