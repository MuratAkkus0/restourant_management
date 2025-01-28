import { DropdownResultListProps } from '@/types/models/molecules/SearchableDropdownModels';

const DropdownResultList: React.FC<DropdownResultListProps> = ({
  filteredCountries,
  handleSelectCountry,
}) => {
  return (
    <>
      <ul className="max-h-60 overflow-y-auto">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((data) => (
            <li
              key={data.code}
              onClick={() => handleSelectCountry(data)}
              className="p-2 sm:p-3 hover:bg-gray-200 cursor-pointer border-b border-gray-100 shadow-sm"
            >
              {data.name}
            </li>
          ))
        ) : (
          <li className="p-3 text-gray-500">No countries found</li>
        )}
      </ul>
    </>
  );
};

export default DropdownResultList;
