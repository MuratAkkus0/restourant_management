import { SearchableDropdownProps } from '@/types/models/ComponentPromptModels';
import React, { useState, useRef, useEffect } from 'react';

// Props tipi

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  countryList,
  onCountrySelect,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('Germany');
  const [query, setQuery] = useState<string>('');
  const [filteredCountries, setFilteredCountries] = useState(countryList);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

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
    <div className="relative w-full mx-auto bg-white" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <div
        className={`p-2 sm:p-3 border ${isDropdownOpen ? 'border-black' : 'border-gray-300'} rounded-lg cursor-pointer flex items-center justify-between`}
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        <span className="text-gray-700">
          {selectedCountry || 'Select a country'}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Search Input */}
      {isDropdownOpen && (
        <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg absolute top-full left-0 right-0 z-10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 rounded-lg border-b border-gray-300"
            placeholder="Search for a country"
          />
          {/* Dropdown List */}
          <ul className="max-h-60 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <li
                  key={country.code}
                  onClick={() => handleSelectCountry(country)}
                  className="p-2 sm:p-3 hover:bg-gray-200 cursor-pointer border-b border-gray-100 shadow-sm"
                >
                  {country.name}
                </li>
              ))
            ) : (
              <li className="p-3 text-gray-500">No countries found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
