import { useEffect, useState } from 'react';
import DropdownResultList from './DropdownResultList';
import { DropdownSearchProps } from '@/types/models/molecules/SearchableDropdownModels';

const DropdownSearch: React.FC<DropdownSearchProps> = ({
  dataList,
  isDropdownOpen,
  setSelectedCountry,
  setDropdownOpen,
  onDataSelect,
}) => {
  const [query, setQuery] = useState<string>('');
  const [filteredCountries, setFilteredCountries] = useState(dataList);

  useEffect(() => {
    if (query) {
      const filtered = dataList.filter((data) =>
        data.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(dataList);
    }
  }, [query, dataList]);

  const handleSelectCountry = (data: { name: string; code: string }) => {
    setSelectedCountry(data.name);
    setQuery('');
    setDropdownOpen(false);
    onDataSelect(data.code);
  };
  return (
    <>
      {isDropdownOpen && (
        <div className="mt-2 text-sm bg-white border border-gray-300 rounded-lg shadow-lg absolute top-full left-0 right-0 z-10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 rounded-lg border-b border-gray-300"
            placeholder="Search..."
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
