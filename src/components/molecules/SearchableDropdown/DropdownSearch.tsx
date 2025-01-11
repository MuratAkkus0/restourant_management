import { useEffect, useState } from 'react';
import DropdownResultList from './DropdownResultList';
import { DropdownSearchProps } from '@/types/models/molecules/SearchableDropdownModels';

const DropdownSearch: React.FC<DropdownSearchProps> = ({
  countryList,
  isDropdownOpen,
  setSelectedCountry,
  setDropdownOpen,
  onCountrySelect,
}) => {
  const [query, setQuery] = useState<string>('');
  const [filteredCountries, setFilteredCountries] = useState(countryList);

  useEffect(() => {
    if (query) {
      const filtered = countryList.filter((country) =>
        country.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countryList);
    }
  }, [query, countryList]);

  const handleSelectCountry = (country: { name: string; code: string }) => {
    setSelectedCountry(country.name);
    setQuery('');
    setDropdownOpen(false);
    onCountrySelect(country.code);
  };
  return (
    <>
      {isDropdownOpen && (
        <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg absolute top-full left-0 right-0 z-10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 rounded-lg border-b border-gray-300"
            placeholder="Search for a country"
          />
          <DropdownResultList
            filteredCountries={filteredCountries}
            handleSelectCountry={handleSelectCountry}
          />
        </div>
      )}
    </>
  );
};

export default DropdownSearch;
