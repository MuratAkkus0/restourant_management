export interface DropdownResultListProps {
  filteredCountries: Array<any>;
  handleSelectCountry: CallableFunction;
}

const DropdownResultList: React.FC<DropdownResultListProps> = ({
  filteredCountries,
  handleSelectCountry,
}) => {
  return (
    <>
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
    </>
  );
};

export default DropdownResultList;
