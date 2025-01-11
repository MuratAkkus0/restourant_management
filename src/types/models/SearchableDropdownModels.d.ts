export interface SearchableDropdownProps {
  countryList: { name: string; code: string }[];
  onCountrySelect: (country: string) => void;
}
export interface DropdownSearchProps {
  countryList: { name: string; code: string }[];
  onCountrySelect: (country: string) => void;
  isDropdownOpen: boolean;
  setSelectedCountry: CallableFunction;
  setDropdownOpen: CallableFunction;
}
