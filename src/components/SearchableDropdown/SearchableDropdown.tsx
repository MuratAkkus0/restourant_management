import { SearchableDropdownProps } from '@/types/models/SearchableDropdownModels';
import React, { useState, useRef, useEffect } from 'react';
import FunctionalArrowUpDownIcon from '../FunctionalArrowUpDownIcon';
import DropdownSearch from './DropdownSearch';

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  countryList,
  onCountrySelect,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('Germany');
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
        <FunctionalArrowUpDownIcon willItTurn={true} isOpen={isDropdownOpen} />
      </div>

      <DropdownSearch
        countryList={countryList}
        isDropdownOpen={isDropdownOpen}
        onCountrySelect={onCountrySelect}
        setDropdownOpen={setDropdownOpen}
        setSelectedCountry={setSelectedCountry}
      />
    </div>
  );
};

export default SearchableDropdown;
