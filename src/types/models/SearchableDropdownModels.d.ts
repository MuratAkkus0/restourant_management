export interface SearchableDropdownProps {
  countryList: { name: string; code: string }[];
  onCountrySelect: (country: string) => void;
}
