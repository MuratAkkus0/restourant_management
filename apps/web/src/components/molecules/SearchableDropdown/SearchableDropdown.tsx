import { SearchableDropdownProps } from '@/types/models/molecules/SearchableDropdownModels';
import React, { useState, useRef, useEffect } from 'react';
import DropdownSearch from './DropdownSearch';
import FunctionalArrowUpDownIcon from '@/components/atoms/FunctionalArrowUpDownIcon';

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  dataList,
  defaultValue = 'Germany',
  onDataSelect,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>(defaultValue);
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
        className={`p-2 sm:p-3 border ${isDropdownOpen ? 'border-black' : 'border-gray-300'} rounded-lg cursor-pointer flex items-center justify-between text-sm`}
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        <span className="text-gray-700">
          {selectedCountry || 'Select a data'}
        </span>
        <FunctionalArrowUpDownIcon willItTurn={true} isOpen={isDropdownOpen} />
      </div>

      <DropdownSearch
        dataList={dataList}
        isDropdownOpen={isDropdownOpen}
        onDataSelect={onDataSelect}
        setDropdownOpen={setDropdownOpen}
        setSelectedCountry={setSelectedCountry}
      />
    </div>
  );
};

export default SearchableDropdown;
